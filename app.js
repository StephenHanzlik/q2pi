'use strict';



const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(morgan('short'));
app.use(express.static('public'));

var users = require('./routes/users.js');
app.use('/users',users);

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});

module.exports = app;
