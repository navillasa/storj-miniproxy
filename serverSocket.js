const ws = require('ws');
const express = require('express');
var createBucket = require('./routes/createBucket');

class ServerSocket {
  constructor(wss, ws) {
    console.log('ws init ran');

    wss.on('connection', (ws) => {
      console.log('websocket connection open');

      if (ws.readyState === ws.OPEN) {
        
        ws.on('message', (msg) => {
          let parsedData = JSON.parse(msg);
          console.log(parsedData);
          if (parsedData.option == 'createBucket') {
            console.log('hoooooo');
          }
        });

        ws.send(JSON.stringify({
          msg1: 'hello i\'m message 1'
        }));

      }

   });

  }
}

module.exports = ServerSocket;
