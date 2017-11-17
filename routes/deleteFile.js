const express = require('express');
const router = express.Router();

module.exports = (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;
  let fileId = req.params.fileId;

  // deletes file
  storj.deleteFile(bucketId, fileId, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('deletes file');
  });

  res.redirect('back');

}
