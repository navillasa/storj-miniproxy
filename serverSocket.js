const ws = require('ws');
const express = require('express');
const { Environment } = require('storj');

const storj = new Environment({
  bridgeUrl: process.env.BRIDGE_URL,
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  loglevel: 4
});

class ServerSocket {
  constructor(wss, ws) {
    console.log('ws init ran');

    wss.on('connection', (ws) => {
      console.log('websocket connection open');

      if (ws.readyState === ws.OPEN) {
        
        ws.on('message', (msg) => {
          let parsedData = JSON.parse(msg);
          console.log(parsedData);
          // if (parsedData.option == 'createBucket') {
          //   console.log('hoooooo');
          // }
        });

        // excuse this horrific use of a constructor
        // trying to send bucketId values to the browser
        // in order to create links to each bucket
        storj.getBuckets((err, buckets) => {
          if (err) {
            return console.log(err);
          }
          let bucketIdArray = buckets.map((bucket) => {
            return bucket['id'];
          });
          ws.send(JSON.stringify({
            msg1: 'hello i\'m message 1',
            bucketList: bucketIdArray
          }));

        });

      }

   });

  }
}

module.exports = ServerSocket;
