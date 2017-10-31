var express = require('express');
var router = express.Router();

// grabs `storj` variable from app
router.get('/', (req, res, next) => {
  var storj = req.storj;

  // console logs buckets
  storj.getBuckets((err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log('buckets:', res);
    
    // adds layout default for bucketList page
    res.render('bucketList', {
      layout: 'layout',
      title: 'List of Buckets',
      buckets: res.buckets
    });
  });

  
});

module.exports = router;
