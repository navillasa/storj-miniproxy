'use strict';

const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app');

describe('Tests loading express', function () {
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
        expect(res.body).to.be.empty;
        expect(res.statusCode).to.equal(200);
        expect(res.ok).to.equal(true);
        done();
      });
  });

  it('should 404 everything else', function testPath(done) {
    request(server)
      .get('/sample/example')
      .expect(404, done);
  });
});

describe('Tests for GET /bucketList', function () {
  it('should respond with bucketList page', function (done) {
    request(app)
      .get('/bucketList')
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(200);
        expect(res.ok).to.equal(true);
        expect(res.body).to.be.empty;
        done();
      });
  });
});

describe('Tests for GET /bucketList/:bucketId', function () {
  it('should respond with given bucket page', function (done) {
    let bucketId = 'e9980f248d1f5b62802e310a'; 
    request(app)
      .get(`/bucketList/${bucketId}`)
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(200);
        expect(res.ok).to.equal(true);
        expect(res.body).to.be.empty;
        expect(res.req.path).to.equal(`/bucketList/${bucketId}`);
        done();
      }); 
  });
});

describe('Tests for GET /createBucket', function () {
  it('should create a bucket', (done) => {
    request(app)
      .get('/createBucket')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

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

describe('Tests for POST /bucketList/:bucketId/upload', function () {
  it('should send chosen file to local server', (done) => {
    let bucketId = 'e9980f248d1f5b62802e310a';
    request(app)
      .post(`/bucketList/${bucketId}/upload`)
      .attach('test', 'test/test.jpg')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

// describe('Tests for GET /bucketList/:bucketId/:fileId/download', function () {
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

// describe('Tests for GET /bucketList/:bucketId/deleteBucket', function () {
//   it('should delete specified bucket', (done) => {
//     request(app)
//       .get('/bucketList/fakeBucket/deleteBucket')
//       .end((err, res) => {
//         if (err) throw err;
//         // console.log('****res.body for GET /bucketList/:bucketId/deleteBucket');
//         done();
//       })
//   });
// });

// describe('Tests for GET /bucketList/:bucketId/:fileId/deleteFile', function () {
//   it('should delete file within bucket', (done) => {
//     request(app)
//       .get('/bucketList/fakeBucket/fakeFile')
//       .end((err, res) => {
//         if (err) throw err;
//         done();
//       })
//   });
// });
