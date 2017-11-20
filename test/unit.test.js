'use strict';

const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const bucketList = require('../routes/bucketList');
const bucketPage = require('../routes/bucketPage');
const createBucket = require('../routes/createBucket');
const deleteBucket = require('../routes/deleteBucket');
const deleteFile = require('../routes/deleteFile');
const download = require('../routes/download');
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

  it('should call createBucket with error', (done) => {
    const testBucketName = 'unitTest-' + Date.now();
    const req = {
      storj: {
        createBucket: sinon.stub().callsArgWith(1, new Error('test'))
      }
    };
    const res = {};
    createBucket(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });

  it('should call deleteBucket with error', (done) => {
    const req = {
      storj: {
        deleteBucket: sinon.stub().callsArgWith(1, new Error('test'))
      },
      params: {
        bucketId: 'dbff2e8412adb9c0b65f7eb8'
      }
    };
    const res = {};
    deleteBucket(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });

  it('should call deleteFile with error', (done) => {
    const req = {
      storj: {
        deleteFile: sinon.stub().callsArgWith(2, new Error('test'))
      },
      params: {
        bucketId: '50141fe9acaaab4e7b52e2e1',
        fileId: '9a662ffcc463d6afad552bfd'
      }
    };
    const res = {};
    deleteFile(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });

  it('should call download with error', (done) => {
    let resolveFile = function(bucketId, fileId, downloadFilePath, options) {
      options.finishedCallback(new Error('test'));
    }
    const req = {
      storj: {
        resolveFile: resolveFile
      },
      params: {
        bucketId: '4755483a2a2d3c5249ac9e10',
        fileId: '9520ecd823b3ebb40d716a52'
      }
    };
    const res = {};
    download(req, res, (err) => {
      expect(err.message).to.equal('test');
      done();
    });
  });
      
});
