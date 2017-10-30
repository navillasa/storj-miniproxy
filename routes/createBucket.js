var express = require('express');
var router = express.Router();

// creates test bucket
const testBucketName = 'test-' + Date.now();

// grabs var storj from app
router.get('/', (req, res, next) => {
  var storj = req.storj;

  storj.createBucket(testBucketName, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log('info:', res);
    storj.destroy();
  });
});
