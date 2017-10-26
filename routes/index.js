var express = require('express');
var router = express.Router();
const app = require('../app.js');

// set up storj environment
const storj = new app.Environment({
  bridgeUrl: 'https://api.storj.io',
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  logLevel: 0
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
