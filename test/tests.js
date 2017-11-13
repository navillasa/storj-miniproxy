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
      .expect(200, done);
  });

  it('should 404 everything else', function testPath(done) {
    request(server)
      .get('/sample/example')
      .expect(404, done);
  });
});

describe('GET /bucketList', function () {
  it('should call getBuckets', function () {
    request(app)
      .get('/bucketList')
      .end((err, res) => {
        if (err) throw err; 
        console.log('****res for bucketList is:', res);
      });
  });
});

describe('GET /bucketList/:id', function () {
  it('should call listFiles', function (done) {
    request(app)
      .get('/bucketList/e9980f248d1f5b62802e310a')
      .end((err, res) => {
        if (err) throw err;
        console.log('****res.body for GET /bucketList/:id is', res.body);
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
