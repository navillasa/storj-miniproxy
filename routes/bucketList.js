var express = require('express');
var router = express.Router();

// grabs var storj from app
router.get('/', (req, res, next) => {
  var storj = req.storj;
  console.log(storj);

// console logs for info(?) and buckets
// hmm for some reason the var storj here is still undefined
// need to figure out
storj.getInfo((err, res) => {
  if (err) {
    return console.error(err);
  }
  console.log('info:', result);

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
