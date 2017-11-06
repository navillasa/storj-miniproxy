const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

let upload = multer({ storage: storage }).single('dogPhoto');

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log('an error occurred when uploading');
      return
    }
    res.json({
      success: true,
      message: 'image uploaded :)'
    });
  })
});

module.exports = router;
