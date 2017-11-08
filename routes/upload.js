const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Environment } = require('storj');

const storj = new Environment({
  bridgeUrl: process.env.BRIDGE_URL,
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  logLevel: 4
});

const fileTitle = 'pogPhoto-' + Date.now() + '.jpg';
const uploadFilePath = './uploads/' + fileTitle;

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function(req, file, callback) {
    callback(null, fileTitle)
  }
});

// we accept a single file with field name 'dogPhoto'
let upload = multer({ storage: storage }).single('dogPhoto');

router.post('/bucketList/:bucketId/upload', (req, res) => {
  let bucketId = req.params.bucketId;

  function uploadFile() {
    console.log('entering uploadFile');
    let uploadFilePromise = new Promise((resolve, reject) => {
      upload(req, res, function(err) {
        if (err) {
          reject(err);
          res.end('multer error uploading file');
        } else {
          console.log('upload resolve');
          resolve(req);
          res.end('file successfully uploaded to local server!');
        }
      });
    });
    return uploadFilePromise;
  }

  function sendToBridge() {
    console.log('entering sendToBridge');
    console.log('uploadFilePath: %s', uploadFilePath);
    storj.storeFile(bucketId, uploadFilePath, {
      filename: fileTitle,
      progressCallback: (progress, uploadedBytes, totalBytes) => {
        console.log('Progress: %d, UploadedBytes: %d, TotalBytes: %d',
            progress, uploadedBytes, totalBytes);
      },
      finishedCallback: (err, fileId) => {
        if (err) {
          return console.log(err);
        }
        console.log('File upload complete:', fileId);
      }
    });
  }

  uploadFile().then(sendToBridge);

});

module.exports = router;
