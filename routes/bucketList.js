var express = require('express');
var router = express.Router();

// grabs `storj` variable from app
router.get('/', (req, res, next) => {
  var storj = req.storj;
  console.log(storj);

  // console logs for bridge info and buckets
  storj.getBuckets((err, res) => {
    if (err) {
      return console.error('meep mo', err);
    }
    console.log('buckets:', res);

   //  storj.getBuckets((err, res) => {
   //   if (err) {
   //     return console.error(err);
   //   }
   //   console.log('buckets:', res);
    });
  });

// });

module.exports = router;
