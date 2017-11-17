const express = require('express');
const router = express.Router();
const url = require('url'); 

module.exports = (req, res, next) => {
  const storj = req.storj;

  // assigns test bucket name
  let testBucketName = 'test-' + Date.now();

  // creates bucket
  storj.createBucket(testBucketName, (err, bucket) => {
    if (err) {
      return next(err);
    }
    return res.redirect(url.format({
      pathname: '/bucketList',
      query: {
        bucket_id: bucket.id,
        bucket_name: bucket.name,
        message: 'success'
      } 
    }));
  });
}
