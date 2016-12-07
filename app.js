'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const users = require('./routes/users');

app.use(morgan('short'));
app.use(express.static('public'));
app.use('/users',users);


app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});

module.exports = app;
