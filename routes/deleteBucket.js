const express = require('express');
const router = express.Router();

module.exports = (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // deletes bucket
  storj.deleteBucket(bucketId, function (err) {
    if (err) {
     return console.log(err);
    }
  });

  res.redirect('back');

}
