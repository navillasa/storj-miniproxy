var express = require('express');
var router = express.Router();
const { Environment } = require('storj');

const storj = new Environment({
  bridgeUrl: process.env.BRIDGE_URL,
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  loglevel: 4
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
      buckets: JSON.stringify(buckets)
    });
  });
  
});

storj.getBuckets((err, buckets) => {
  if (err) {
    return console.log(err);
  }
  buckets.forEach((bucket) => {
    router.get('/' + bucket['id'], (req, res) => {
      res.render(bucket['id'], {
        layout: 'layout',
        title: 'I\'m a Bucket'
      });
    });
  });
});

module.exports = router;
