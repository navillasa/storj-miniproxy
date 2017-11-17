const express = require('express');
const router = express.Router();

module.exports = (req, res, next) => {
  let storj = req.storj;

  // gets buckets
  storj.getBuckets((err, buckets) => {
    if (err) {
      return next(err);
    }

    // renders buckets to bucketList page
    // using handlebars template
    res.render('bucketList', {
      layout: 'layout',
      title: 'List of Buckets',
      buckets: buckets
    });
  });
}
