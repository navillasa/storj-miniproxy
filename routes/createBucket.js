const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const storj = req.storj;

  // assigns test bucket name
  let testBucketName = 'test-' + Date.now();

  // creates bucket
  storj.createBucket(testBucketName, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log('info:', res);
  });

  res.redirect('back');

});

module.exports = router;
