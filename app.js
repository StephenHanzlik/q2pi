'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const cookieParser = require('cookie-parser');
const privateKey = 'my_awesome_cookie_signing_key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('short'));
app.use(express.static('public'));

app.use(cookieParser());

var users = require('./routes/users.js');
var uploads = require('./routes/upload-route.js');
var token = require('./routes/token-route.js');
var serialio_route = require('./routes/serialport-route.js');

app.use('/users', users);
app.use('/uploads', uploads);
app.use('/token', token);

app.use('/serialport', serialio_route);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});



module.exports = app;
