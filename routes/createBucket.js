var express = require('express');
var router = express.Router();

// grabs var storj from app
router.get('/', (req, res, next) => {
  var storj = req.storj;
});

// creates test bucket
const testBucketName = 'test-' + Date.now();
storj.createBucket((testBucketName, (err, res) => {
  if (err) {
    return console.error(err);
  }
  console.log('info:', res);
  storj.destroy();
});
