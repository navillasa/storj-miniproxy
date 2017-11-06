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

// grabs `storj` variable from app
router.get('/', (req, res, next) => {
  var storj = req.storj;

  // console logs buckets
  storj.getBuckets((err, buckets) => {
    if (err) {
      return console.error(err);
    }
    console.log('buckets:', buckets);
   
    buckets.forEach((bucket) => {
      console.log('id:', bucket['id']);
    });
    
    // adds layout default for bucketList page
    res.render('bucketList', {
      layout: 'layout',
      title: 'List of Buckets',
      buckets: buckets,
    });
  });
  
});

router.get('/:bucketId', (req, res, next) => {
  let bucketId = req.params.bucketId;
  res.render('bucket', {
    layout: 'layout',
    id: bucketId
  });
})

router.post('/:bucketId/upload/', (req, res) => {
  let bucketId = req.params.bucketId;
  storj.storeFile(bucketId, 'uploads/', {
    filename: 'test.jpg',
    progressCallback: (progress, uploadedBytes, totalBytes) => {
      console.log('Progress: %d, UploadedBytes: %d, TotalBytes: %d',
          progress, uploadedBytes, totalBytes);
    },
    finishedCallback: (err, fileId) => {
      if (err) {
        return console.log(err);
      }
      console.log('File upload complete: ', fileId);
      res.json({
        success: true,
        message: 'image uploaded :)'
      });
    }
  });
});

module.exports = router;
