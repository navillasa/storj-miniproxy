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
