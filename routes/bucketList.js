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

router.get('/', (req, res, next) => {
  // gets buckets
  storj.getBuckets((err, buckets) => {
    if (err) {
      return console.log(err);
    }
    console.log('buckets:', buckets);
   
    // renders buckets to bucketList page
    // using handlebars template
    res.render('bucketList', {
      layout: 'layout',
      title: 'List of Buckets',
      buckets: buckets, // this could be more specific
    });
  });
});

// creates bucket page
router.get('/:bucketId', (req, res, next) => {
  let bucketId = req.params.bucketId;

  // gets files inside bucket 
  storj.listFiles(bucketId, (err, bucketFiles) => {
    if (err) {
      return console.log('listFiles error:', err);
    }
    console.log('files in bucket:', bucketFiles);

    res.render('bucket', {
      layout: 'layout',
      bucketId: bucketId,
      files: bucketFiles
    });
  });
});

module.exports = router;
