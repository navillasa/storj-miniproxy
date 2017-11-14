const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();

// setup
const index = require('./routes/index');
const bucketList = require('./routes/bucketList');
const bucketPage = require('./routes/bucketPage');
const upload = require('./routes/upload');
const download = require('./routes/download');
const deleteFile = require('./routes/deleteFile');
const createBucket = require('./routes/createBucket');
const deleteBucket = require('./routes/deleteBucket');

const app = express();

// setup storj environment
const { Environment } = require('storj');
const storj = new Environment({
  bridgeUrl: process.env.BRIDGE_URL, 
  bridgeUser: process.env.BRIDGE_EMAIL,
  bridgePass: process.env.BRIDGE_PASS,
  encryptionKey: process.env.ENCRYPT_KEY,
  logLevel: 4
}); 

// view engine setup
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// passes storj in middleware
app.use((req, res, next) => {
  req.storj = storj;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/bucketList', bucketList);
app.use('/', bucketPage);
app.use('/', upload);
app.use('/', download);
app.use('/', deleteFile);
app.use('/', deleteBucket);
app.use('/createBucket', createBucket);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
