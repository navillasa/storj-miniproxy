// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { Environment } = require('storj');

// const storj = new Environment({
//   bridgeUrl: process.env.BRIDGE_URL,
//   bridgeUser: process.env.BRIDGE_EMAIL,
//   bridgePass: process.env.BRIDGE_PASS,
//   encryptionKey: process.env.ENCRYPT_KEY,
//   logLevel: 4
// });

// // let storage = multer.diskStorage({
// //   destination: function (req, file, callback) {
// //     callback(null, 'uploads/')
// //   },
// //   filename: function (req, file, callback) {
// //     callback(null, file.fieldname + '-' + Date.now() + '.jpg')
// //   }
// // });

// // let upload = multer({ storage: storage }).single('dogPhoto');

// router.post('/:bucketId/upload', (req, res) => {
//   let bucketId = req.params.bucketId;
//   storj.storeFile(bucketId, 'uploads/', {
//     filename: fileName,
//     progressCallback: (progress, uploadedBytes, totalBytes) => {
//       console.log('Progress: %d, UploadedBytes: %d, TotalBytes: %d',
//           progress, uploadedBytes, totalBytes);
//     },
//     finishedCallback: (err, fileId) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log('File upload complete: ', fileId);
//       res.json({
//         success: true,
//         message: 'image uploaded :)'
//       });
//     }
//   });
// });

// module.exports = router;
