const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  let storj = req.storj;

  // gets buckets
  storj.getBuckets((err, buckets) => {
    if (err) {
      return console.log(err);
    }

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
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // gets files inside bucket 
  storj.listFiles(bucketId, (err, bucketFiles) => {
    if (err) {
      return console.log('listFiles error:', err);
    }

    res.render('bucket', {
      layout: 'layout',
      bucketId: bucketId,
      files: bucketFiles
    });
  });
});

module.exports = router;
