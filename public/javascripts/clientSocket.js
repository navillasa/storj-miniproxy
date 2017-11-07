let ws = new WebSocket('ws://localhost:2000');
// const createBucketButton = document.getElementById('createBucket');
const bucketSection = document.getElementById('buckets');
var div = document.createElement('div');

ws.onopen = () => {
  console.log('open')
}

ws.onmessage = (message) => {
  let parsedData = JSON.parse(message.data);
  console.log(parsedData);
}

// createBucketButton.onclick = () => {
//   let message = {
//     option: 'createBucket'
//   }
//   ws.send(JSON.stringify(message));
// }
