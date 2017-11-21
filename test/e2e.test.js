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
  const sandbox = sinon.sandbox.create();
  afterEach(() => sandbox.restore());

  it('should respond with 200 and bucketList page', function (done) {
    request(app)
      .get('/bucketList')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.ok).to.equal(true);
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

describe('Tests for POST /bucketList/:bucketId', function () {
  this.timeout(4000);
  it('should send chosen file to local server', (done) => {
    let bucketId = 'e9980f248d1f5b62802e310a';
    request(app)
      .post(`/bucketList/${bucketId}`)
      .attach('file', 'test/test.jpg')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
        let queryStr = res.header.location;
        let bucketId = queryStr.substring(queryStr.indexOf('?') + 9, queryStr.indexOf('?') + 33);
        done();
      });
  });
});

describe('Tests for GET /bucketList/:bucketId/:fileId/deleteFile', function () {
  this.timeout(4000);
  it('should delete file within bucket', (done) => {
    let bucketId = 'e995ee7cd50855b04ba2528a';
    request(app)
      .post(`/bucketList/${bucketId}`)
      .attach('file', 'test/test2.jpg')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
        let queryStr = res.header.location;
        let fileId = queryStr.substring(queryStr.indexOf('?') + 9, queryStr.indexOf('?') + 33);
        request(app)
          .get(`/bucketList/${bucketId}/${fileId}/deleteFile`)
          .expect(302)
          .end((err, res) => {
            done();
          });
      });
  });
});

describe('Tests for download GET /bucketList/:bucketId/:fileId', function () {
  it('should download file within bucket', (done) => {
    let bucketId = 'e9980f248d1f5b62802e310a';
    let fileId = 'ff334080c8171c2e13d78a81';
    request(app)
      .get(`/bucketList/${bucketId}/${fileId}`)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

describe('Tests for GET /bucketList/:bucketId/deleteBucket', function () {
  it('should delete specified bucket', (done) => {
    request(app)
      .get('/createBucket')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
        console.log('create bucket succeed');
        let queryStr = res.header.location;
        let bucketId = queryStr.substring(queryStr.indexOf('?') + 11, queryStr.indexOf('?') + 35);
        request(app)
          .get(`/bucketList/${bucketId}/deleteBucket`)
          .expect(302)
          .end((err, res) => {
            done();
          });
      });
  });
});
