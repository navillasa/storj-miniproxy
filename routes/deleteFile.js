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

router.get('/bucketList/:bucketId/:fileId/deleteFile', (req, res) => {
  let bucketId = req.params.bucketId;
  let fileId = req.params.fileId;

  // deletes file
  storj.deleteFile(bucketId, fileId, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('deletes file');
  });

  res.redirect('back');

});

module.exports = router;
