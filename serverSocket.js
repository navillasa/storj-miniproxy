const ws = require('ws');
const express = require('express');

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

      }

   });

  }
}

module.exports = ServerSocket;
