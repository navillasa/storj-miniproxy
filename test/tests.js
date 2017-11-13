'use strict';

const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app');

chai.use(require('chai-http'));

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

describe('GET /buckets', function () {
  it('should call getBuckets', function () {
    request(app)
      .get('/bucketList')
      .expect('Content-Length', '4')
      .expect('Content-Type', 'json')
      .end((err, res) => {
        if (err) throw err; 
        console.log('res: ', res);
      });
  });
});

describe('GET /bucketList/:id', function () {
  it('should call listFiles', function (done) {
    request(app)
      .get('/bucketList/e9980f248d1f5b62802e310a')
      .end((err, res) => {
        if (err) throw err;
        console.log('res.body', res.body);
        done();
      }); 
  });
});

