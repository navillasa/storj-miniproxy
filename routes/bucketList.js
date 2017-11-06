const express = require('express');
const router = express.Router();

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
  var bucketId = req.params.bucketId;
  res.render('bucket', {
    layout: 'layout',
    id: bucketId
  });
});

module.exports = router;
