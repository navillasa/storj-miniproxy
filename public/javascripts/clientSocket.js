let ws = new WebSocket('ws://localhost:9000');
// const createBucketButton = document.getElementById('createBucket');

ws.onopen = () => {
  console.log('open')
}

ws.onmessage = (ev) => {
  let _data = JSON.parse(ev.data);
  console.log(_data);
}

// createBucketButton.onclick = () => {
//   let message = {
//     option: 'createBucket'
//   }
//   ws.send(JSON.stringify(message));
// }
