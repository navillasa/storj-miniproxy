const express = require('express');
const router = express.Router();

// grabs var storj from app
router.get('/', (req, res, next) => {
  const storj = req.storj;

  // assigns test bucket name
  let testBucketName = 'test-' + Date.now();

  // creates bucket
  storj.createBucket(testBucketName, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log('info:', res);
  });

  res.redirect('back');

});

module.exports = router;
