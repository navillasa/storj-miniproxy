'use strict';

const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const bucketList = require('../routes/bucketList');
const bucketPage = require('../routes/bucketPage');
const { Environment } = require('storj');

describe.only('Unit tests for methods in routes', () => {
  const sandbox = sinon.sandbox.create();
  afterEach(() => sandbox.restore());

  it('should call getBuckets with error', (done) => {
    const req = {
      storj: {
        getBuckets: sinon.stub().callsArgWith(0, new Error('test'))
      }
    };
    const res = {};
    bucketList(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });

  it('should call listFiles with error', (done) => {
    const req = {
      storj: {
        listFiles: sinon.stub().callsArgWith(1, new Error('test'))
      },
      params: {
        bucketId: '0e556788af48499ca3b2544d'
      }
    };
    const res = {};
    bucketPage(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });

});
