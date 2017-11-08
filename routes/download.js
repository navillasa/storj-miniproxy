const express = require('express');
const router = express.Router();
const { Environment } = require('storj');

const storj = new Environment({
  bridgeUrl: process.env.BRIDGE_URL,
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  logLevel: 4
});

const downloadFilePath = './downloads/test' + Date.now() + '.jpg';

router.get('/bucketList/:bucketId/:fileId/download', (req, res) => {
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
      res.end('i think file is downloaded..');
    }
  });
});

module.exports = router;
