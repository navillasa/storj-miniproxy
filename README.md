# storj-miniproxy

This is a mini CDN proxy app built using libstorj and node-libstorj.
Working on setting up basic functionalities such as:
  * Listing the user's buckets
  * Adding/removing buckets
  * Uploading files to a bucket
  * Removing files from a bucket

## Sections
* [Connecting to a Bridge Server](#connecting-to-a-bridge-server)
* [Troubleshooting Bridge Access with Storj-SDK](#troubleshooting-bridge-access-with-storj-sdk)
* [Troubleshooting Bridge Access with Storj-Integration](#troubleshooting-bridge-access-with-storj-integration)
* [Verifying Bridge User Credentials](#verifying-bridge-user-credentials)
* [Initial Planning](#initial-planning)
* [Useful Docker Commands](#useful-docker-commands)

## Required Dependencies
  * [libstorj](https://github.com/Storj/libstorj)
  * [node-libstorj](https://github.com/Storj/node-libstorj)
  * dotenv

## Connecting to a Bridge Server
In progress!
[Storj-SDK](https://github.com/Storj/storj-sdk) is recommended for setting up the bridge server for use with this app.

### Troubleshooting Bridge Access with [Storj-SDK](https://github.com/Storj/storj-sdk)

When attempting to use the `bucketList` route to list buckets, I ran into the following error:
```
GET /bucketList - - ms - -
Error: Couldn't connect to server
    at Error (native)
```

### Troubleshooting Bridge Access with [Storj-Integration](https://github.com/Storj/integration)

When attempting to use the `bucketList` route to list buckets, I ran into the following error:
```
GET /bucketList - - ms - -
Error: Not authorized
    at Error (native)
```
This was because I had the incorrect `BRIDGE_EMAIL`, `BRIDGE_PASS`, and `ENCRYPT_KEY` in my .env file.
When using storj-integration, you need to `cd` into your storj-integration directory (wherever you cloned the repo) and then start the container that you have based on the storj-integration image. You can get its container-id as follows:
```bash
docker ps -a|grep storj-integration
```
Then you can start and attach to the container with:
```bash
docker start -ai <container-id>
```
The last step is to run the `start-everything.sh` script from the container you started/attached to:
```bash
/scripts/start-everything.sh
```
As long as you want to connect to the bridge server, you need to keep this terminal window running.
You can then use pm2 commands to view logs etc.

### Verifying Bridge User Credentials
You can check if your bridge user credentials are working using the `list-buckets` command:
```bash
storj -u http://localhost:8080 list-buckets
```
To check your current bridge username, password, and encryption key, you can also use the command:
```bash
storj -u http://localhost:8080 export-keys
```
<b>These credentials</b> are the ones that need to be in your `.env` file, respectively assigned to `BRIDGE_EMAIL`, `BRIDGE_PASS`, `ENCRYPT_KEY`.

You can also view what users are associated with the container.
First use the docker shell to get into a mongo shell:
```bash
mongo
```
Then connect to the `storj-sandbox` database and look for users:
```bash
db = connect('storj-sandbox')
db.users.find({})
```

## Initial Planning

#### Current Goals
- Use WebSockets to make adding/deleting buckets async
- Each bucket should be a button or route to another page that lists files inside the bucket
 - Each bucket page should also have options to upload/download from the bucket

#### Other Things to Consider
- At what point to decrypt the file? (use FlipStream.js?)


## Useful Docker Commands
To see what docker containers are running:
```bash
docker ps
```

To stop a specific container from running:
```bash
docker stop <container id>
```

To stop all running docker containers:
```bash
docker stop $(docker ps -q)
```
