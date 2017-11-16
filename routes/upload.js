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

// accepts a single file with field name 'dogPhoto'
const upload = multer({ storage: storage });
// console.log('***\n\n\n\n\n****', upload);

router.post('/bucketList/:bucketId', (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  function uploadFile() {
    console.log('entering uploadFile');
    let uploadFilePromise = new Promise((resolve, reject) => {
      upload.single('dogPhoto')(req, res, function(err) {
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
    console.log('uploadFilePath: ', uploadFilePath);
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
        // return res.redirect(url.format({
        //   pathname: '/bucketList',
        //   query: {
        //     file_id: fileId,
        //     message: 'success'
        //   }
        // }));
      }
    });
  }

  uploadFile()
    .then(sendToBridge).catch((err) => {
    console.log(err)
  });

  // sometimes this will redirect before file is uploaded
  // so the file won't appear in the browser-- needs fixing
  res.redirect('back');

});

module.exports = router;
