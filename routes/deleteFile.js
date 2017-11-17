const express = require('express');
const router = express.Router();

module.exports = (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;
  let fileId = req.params.fileId;

  // deletes file
  storj.deleteFile(bucketId, fileId, (err) => {
    if (err) {
      return next(err);
    }
    console.log('deletes file');
  });

  res.redirect('back');

}
