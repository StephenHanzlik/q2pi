'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom'); // error logging module
const morgan = require('morgan'); // req/res logging module
const bcrypt = require('bcrypt');

router.use(morgan('short')); // use morgan and format it's output


router.get('/', function(req, res, next) {
  knex('users')
    .orderBy('username')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:username', function(req, res, next) {
  knex('users')
    .select('username')
    .where({ username: req.params.username })
    .first()
    .then(function(results) {
      if (results) {
        res.send(results);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function(err) {
      next(err);
    });
});


router.post('/', (req, res, next) => {
  console.log(req.body);
  var hash = bcrypt.hashSync(req.body.password, 8);
  knex('users')
    .where({ username: req.body.username })
    .then(function(results) {
      if (results.length === 0) {
        knex('users')
          .insert({
            username: req.body.username,
            password: hash,
            email: req.body.email
          })
          .then(function(result) {
            res.sendStatus(201);
          })
          .catch(function(err) {
            next(err);
          });
      } else {
        res.status(400).send('User Already Exists');
      }
    });
});

router.patch('/:id', function(req, res, next) {
  knex('users')
    .max('id')
    .then((result) => {
      if (req.body.password) {
        if (req.params.id <= result[0].max && req.params.id > 0 && !isNaN(req.params.id)) {
          return knex('users')
            .where({ id: req.params.id })
            .first()
            .update({
              username: req.body.username,
              password: bcrypt.hashSync(req.body.password, 8),
              email: req.body.email
            }, '*')
            .then((result) => {
              //TODO: don't send password back on a successfull patch
              res.send(result[0]);
            })
            .catch((err) => {
              next(err);
            });
        } else {
          next(boom.create(404, 'Not Found'));
          return;
        }
      } else {
        next(boom.create(404, 'please specify a password'));
        return;
      }
    });
});

router.delete('/:username', function(req, res, next) {
  knex('users')
    .where({ username: req.params.username })
    .del()
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      next(err);
    });
});





module.exports = router;
