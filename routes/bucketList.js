var express = require('express');
var router = express.Router();

// grabs `storj` variable from app
router.get('/', (req, res, next) => {
  var storj = req.storj;
  console.log(storj);

  // console logs for info(?) and buckets
  storj.getInfo((err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log('info:', res);

    storj.getBuckets((err, res) => {
      if (err) {
        return console.error(err);
      }
      console.log('buckets:', res);
      storj.destroy();
    });
  });

});

module.exports = router;
