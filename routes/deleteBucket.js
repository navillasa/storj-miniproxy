const express = require('express');
const router = express.Router();

router.get('/bucketList/:bucketId/deleteBucket', (req, res) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // deletes bucket
  storj.deleteBucket(bucketId, function (err) {
    if (err) {
     return console.log(err);
    }
  });

  res.redirect('back');

});

module.exports = router;
