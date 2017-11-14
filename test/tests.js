'use strict';

const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app');

describe('loading express', function () {
  let server;
  beforeEach(function () {
    server = require('../app');
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        // console.log('****res.body for index', res.body);
        done();
      });
  });

  it('should 404 everything else', function testPath(done) {
    request(server)
      .get('/sample/example')
      .expect(404, done);
  });
});

describe('GET /bucketList', function () {
  it('should call getBuckets', function (done) {
    request(app)
      .get('/bucketList')
      .end((err, res) => {
        if (err) throw err;
        // console.log('****should be a status code', Response[statusCode]);
        done();
        // console.log('****res for bucketList is:', res);
      });
  });
});

describe('GET /bucketList/:id', function () {
  it('should call listFiles', function (done) {
    request(app)
      .get('/bucketList/e9980f248d1f5b62802e310a')
      .end((err, res) => {
        if (err) throw err;
        // console.log('****res.body for GET /bucketList/:id is', res.body);
        done();
      }); 
  });
});

describe('GET /bucketList/createBucket', function () {
  it('should create a bucket', (done) => {
    let bucketId = 'e9980f248d1f5b62802e310a';
    request(app)
      .get(`/bucketList/${bucketId}`)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

describe('GET /bucketList/:bucketId/deleteBucket', function () {
  it('should delete specified bucket', (done) => {
    request(app)
      .get('/bucketList/fakeBucket/deleteBucket')
      .end((err, res) => {
        if (err) throw err;
        // console.log('****res.body for GET /bucketList/:bucketId/deleteBucket');
        done();
      })
  });
});

describe('GET /bucketList/:bucketId/:fileId/deleteFile', function () {
  it('should delete file within bucket', (done) => {
    request(app)
      .get('/bucketList/fakeBucket/fakeFile')
      .end((err, res) => {
        if (err) throw err;
        // console.log('****res.body for Get /bucketList/:bucketId/:fileId/deleteFile');
        done();
      })
  });
});

// describe('GET /bucketList/:bucketId/:fileId/download', function () {
//   it('should download file within bucket', (done) => {
//     let bucketId = 'e9980f248d1f5b62802e310a';
//     let fileId = '02bcf6f87966f0bed8fe6fff';
//     request(app)
//       .get(`/bucketList/${bucketId}/${fileId}/download`)
//       .end((err, res) => {
//         if (err) throw err;
//         // console.log('****res.body for file download', res.body);
//         done();
//       });
//   });
// });

// describe('POST /bucketList/:bucketId/upload', function () {
//   it('should send chosen file to local server', (done) => {
//     request(app)
//       .post('bucketList/:bucketId/upload')
//       .end((err, res) => {
//         if (err) throw err;
//         console.log('****req.body for upload POST', req.body);
//         done();
//       });
//   });
// });
