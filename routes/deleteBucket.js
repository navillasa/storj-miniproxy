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

router.get('/bucketList/:bucketId/deleteBucket', (req, res) => {
  let bucketId = req.params.bucketId;

  // deletes bucket
  storj.deleteBucket(bucketId, function (err) {
    if (err) {
     return console.log(err);
    }
    console.log('*deletes bucket*');
  });
});

module.exports = router;
