# storj-miniproxy

This app is a mini Express app "gateway" to the Storj library built using libstorj.

Functionalities:
  * Listing current bridge user's buckets
  * Adding and removing buckets
  * Uploading, downloading, and removing files (image/text only) from a bucket
  
## Sections
* [Connecting to a Bridge Server with Storj-SDK](#connecting-to-a-bridge-server-with-storj-sdk)
* [Troubleshooting Bridge Access with Storj-SDK](#troubleshooting-storj-sdk)
* [Connecting to a Bridge Server with Storj-Integration](#connecting-to-a-bridge-server-with-storj-integration)
* [Verifying Bridge User Credentials](#verifying-bridge-user-credentials)
* [Useful Docker Commands](#useful-docker-commands)
* [Development Process](#development-process)

## Required Dependencies
  * [libstorj](https://github.com/Storj/libstorj)
  * [node-libstorj](https://github.com/Storj/node-libstorj)
  * [dotenv](https://github.com/motdotla/dotenv)

## Instructions
After setting up a local bridge server (instructions below) using either storj-integration or storj-sdk, use `npm install` then `npm start`.
Then you can check `http://localhost:7000` to see if the app's index page is there. The reason for not using `http://localhost:3000` is because Docker runs on that port, which you will need to run your Storj test server.

### Connecting to a Bridge Server with [Storj-SDK](https://github.com/Storj/storj-sdk)

See [Storj-SDK](https://github.com/Storj/storj-sdk) README for setup.
Inside your storj-sdk repo, you can check what containers are running with this command:
```bash
docker-compose ps
```
To run the bridge:
```bash
docker-compose up -d
```
To set the bridge address:
```bash
source ./scripts/setbr
```
To set host entries:

(Note that as of 11/3/17, this script will do its job but automatically close your shell when it's finished.)
```bash
source ./scripts/set_host_entries.sh
```
You can confirm where your local bridge is set with:
```bash
source ./scripts/get_local_bridge.sh
```

You'll then be given the address to where the bridge is set. The `BRIDGE_URL` variable needs to be set to this address in your .env file.
In your `~/.storj` directory (for OSX) there should be some IP.json files. Make sure that the credentials in that file match your local bridge's IP address as well. You may have to rename your .json file with the correct IP address.

Now, when you use the command `storj export-keys`, the resulting email, password, and encryption key need to be saved to your `.env` file respectively as `BRIDGE_EMAIL`, `BRIDGE_PASS`, and `ENCRYPT_KEY`.

### Troubleshooting Bridge Access with Storj-SDK
Once inside the storj-sdk directory...
To check your hosts:
```bash
cat /etc/hosts
```
Use `mongo` to check which port that mongo is using. You should get back:
```
MongoDB shell version vx.x.x
connecting to: mongodb://127.0.0.x.yourPortNumber
```
To enter the mongo shell:
```
mongo db:yourPortNumber
```
You'll want to see what databases are available with `show dbs`, then `use storj-sandbox`.
You can view tables with `show tables`.
In order to find your activated bridge user, you can use:
```
db.users.find()
```
Then find the entry where `"activated" : true`.

In your `~/.storj` directory (for OSX) there should be a list of IP.json files. Make sure that the credentials in that file match the IP given by the `setbr` script inside `storj-sdk/`.
You may have to rename your .json file with the correct IP address.

Finally, make sure that you are connected to the storj-local VPN! See the storj-sdk README for specific setup.


### Connecting to a Bridge Server with [Storj-Integration](https://github.com/Storj/integration)
See [Storj-Integration](https://github.com/Storj/integration) README for setup.
Every time you start a new integration instance, you're going to need to register a new user. This user's username and password will be saved to the Mongo database in the integration container.

You can register a new user with the command:
```
storj -u http://localhost:6382 register
```
The `storj` prefix is used to access the CLI included with [libstorj](https://github.com/Storj/libstorj).

When using storj-integration, you need to `cd` into your storj-integration directory (wherever you cloned the repo) and then start the container that you have based on the storj-integration image. You can get its container-id as follows:
```bash
docker ps -a|grep storj-integration
```
Then you can start and attach to the container with:
```bash
docker start -ai <container-id>
```
When it prompts with `root@<container-id>:~#`, the last step is to run the `start_everything.sh` script:
```bash
./scripts/start_everything.sh
```
As long as you want to connect to the bridge server, you need to keep this terminal window running.
You can then use pm2 commands to view logs etc.

### Verifying Bridge User Credentials
You can check if your bridge user credentials are working using the `list-buckets` command:
```bash
storj -u http://localhost:6382 list-buckets
```
Note: Port 6382 is used with the integration bridge. If you're using the SDK, you should use `http://<bridge address>`.
To check your current bridge username, password, and encryption key, you can also use the command:
```bash
storj -u http://localhost:6382 export-keys
```
These credentials are the ones that need to be in your `.env` file, respectively assigned to `BRIDGE_EMAIL`, `BRIDGE_PASS`, `ENCRYPT_KEY`.

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
If you find that the bridge user account that you want to use has `"activated"` set to `"false"` in the user object, then you can use the following to activate:
```bash
db.users.findOneAndUpdate({_id:<your user email string>}, {$set:{activated: true, activator: null}});
```

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

## Development Process

#### Current Goals
 - Rewrite routes without the redundant endpoint names.
 - Fix Travis build error.

#### Issues
- Files can't be uploaded directly from the clientside to the Storj library (Reed Solomon requires entire file, not streamed parts), so I'm using multer to save uploaded files to the local server (in `uploads/`), and then running the bridge method `storeFile`.
- Running into network error when uploading files using the sdk. Successfully retrieves frame id and creates frame, which is good, but when it starts `Pushing frame for shard index 0...`, begins to receive this error:
```
{"message": "fn[push_frame] - JSON Response: { "error": "getaddrinfo ENOTFOUND landlord landlord:8081" }", "level": 4, "timestamp": 1510079825998}

Error: Unable to receive storage offer
    at Error (native)
```
- NB: When attempting to use the `bucketList` route to list buckets, I ran into the following error:
```
GET /bucketList - - ms - -
Error: Not authorized
    at Error (native)
```
This was because I had the incorrect `BRIDGE_EMAIL`, `BRIDGE_PASS`, and `ENCRYPT_KEY` in my .env file.
