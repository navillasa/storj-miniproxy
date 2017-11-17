const express = require('express');
const router = express.Router();

module.exports = (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // deletes bucket
  storj.deleteBucket(bucketId, (err) => {
    if (err) {
     return next(err);
    }
  });

  res.redirect('back');

}
