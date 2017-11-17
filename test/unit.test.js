'use strict';

const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const bucketList = require('../routes/bucketList');
const { Environment } = require('storj');

describe('Unit tests for methods in routes', () => {
  const sandbox = sinon.sandbox.create();
  afterEach(() => sandbox.restore());

  it('should call getBuckets', (done) => {
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
});
