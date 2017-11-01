var express = require('express');
var router = express.Router();

// assigns test bucket name
const testBucketName = 'test-' + Date.now();

// grabs var storj from app
router.get('/', (req, res, next) => {
  var storj = req.storj;

  // creates bucket
  storj.createBucket(testBucketName, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log('info:', res);
  });

});

module.exports = router;
