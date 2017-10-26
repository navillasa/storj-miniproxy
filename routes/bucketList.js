var express = require('express');
var router = express.Router();

// console logs for info(?) and buckets
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

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});



module.exports = router;
