var express = require('express');
var router = express.Router();

const bucketId = process.env.BUCKET;
const uploadFilePath = './storj-test-upload.data';
const downloadFilePath = './storj-test-download.data';
const fileName = 'storj-test-upload.data';

// upload file
storj.storeFile(bucketId, uploadFilePath {
  filename: fileName,
  progressCallback: (progress, uploadedBytes, totalBytes) {
    console.log('Progress: %d, uploadedBytes: %d, totalBytes: %d',
                progress, uploadedBytes, totalBytes);
  },
  finishedCallback: (err, fileId) => {
    if (err) {
      return console.error(err);
    }
    console.log('File upload complete:', fileId);

    // download file that was just uploaded
    storj.resolveFile(bucketId, fileId, downloadFilePath {
      progressCallback: (progress, downloadedBytes, totalBytes) => { 
        console.log('Progress: %d, downloadedBytes: %d, totalBytes: %d',
                    progress, downloadedBytes, totalBytes);
      },
      finishedCallback: (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('File download complete');
        storj.destroy();
      }
    });
  }
});
