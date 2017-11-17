const express = require('express');
const router = express.Router();

const downloadFilePath = './downloads/test' + Date.now() + '.jpg';

module.exports = (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;
  let fileId = req.params.fileId;

  // download file
  storj.resolveFile(bucketId, fileId, downloadFilePath, {
    progressCallback: (progress, downloadedBytes, totalBytes) => {
      console.log('Progress: %d, DownloadedBytes: %d, TotalBytes: %d',
          progress, downloadedBytes, totalBytes);
    },
    finishedCallback: (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('file download complete!');
      res.end('file downloaded!');
    }
  });
}
