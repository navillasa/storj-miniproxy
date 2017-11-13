const express = require('express');
const router = express.Router();

router.get('/bucketList/:bucketId/:fileId/deleteFile', (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;
  let fileId = req.params.fileId;

  // deletes file
  storj.deleteFile(bucketId, fileId, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('deletes file');
  });

  res.redirect('back');

});

module.exports = router;
