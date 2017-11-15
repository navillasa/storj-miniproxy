const express = require('express');
const router = express.Router();

// creates bucket page
router.get('/bucketList/:bucketId', (req, res, next) => {
  let storj = req.storj;
  let bucketId = req.params.bucketId;

  // gets files inside bucket 
  storj.listFiles(bucketId, (err, bucketFiles) => {
    if (err) {
      return err;
    }

    res.render('bucket', {
      layout: 'layout',
      bucketId: bucketId,
      files: bucketFiles
    });
  });
});

module.exports = router;
