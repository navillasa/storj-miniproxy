const express = require('express');
const router = express.Router();
const multer = require('multer');
const url = require('url');

const fileTitle = 'testPhoto-' + Date.now() + '.jpg';
const uploadFilePath = './uploads/' + fileTitle;

// multer middleware setup
let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function(req, file, callback) {
    callback(null, fileTitle)
  }
});

// accepts a single file
const upload = multer({ storage: storage }).single('file');

module.exports = (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  function uploadFile() {
    console.log('entering uploadFile');
    let uploadFilePromise = new Promise((resolve, reject) => {
      upload(req, res, function(err) {
        if (err) {
          console.log('multer error uploading file');
          return reject(err);
        } else {
          console.log('upload resolve');
          resolve(req);
          console.log('file successfully uploaded to local server!');
        }
      });
    });
    return uploadFilePromise;
  }

  function sendToBridge() {
    console.log('entering sendToBridge');
    storj.storeFile(bucketId, uploadFilePath, {
      filename: fileTitle,
      progressCallback: (progress, uploadedBytes, totalBytes) => {
        console.log('Progress: %d, UploadedBytes: %d, TotalBytes: %d',
            progress, uploadedBytes, totalBytes);
      },
      finishedCallback: (err, fileId) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        console.log('File upload complete:', fileId);
        return res.redirect(url.format({
          pathname: '/bucketList',
          query: {
            file_id: fileId,
            message: 'success'
          }
        }));
      }
    });
  }

  uploadFile()
    .then(sendToBridge)
    .catch((err) => {
      return next(err);
    });

}
