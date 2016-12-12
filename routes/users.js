'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = 'my_awesome_cookie_signing_key';

const authorize = function(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.redirect('/signin.html');
    }
    req.token = decoded;
    next();
  });
};

router.get('/', authorize, function(req, res, next) {
  jwt.verify(req.cookies.token, privateKey, function(err, decoded) {
      if (err) {
        // next(boom.create(401, 'Unauthorized'));
        res.redirect('/signin.html');
        return;
      } else {
        knex('users')
          .orderBy('username')
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            next(err);
          });
      }
    });
});

router.get('/:username', authorize, function(req, res, next) {
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
            res.send(result);
            // res.sendStatus(200);
          })
          .catch(function(err) {
            next(err);
          });
      } else {
        res.status(400).send('User Already Exists');
      }
    });
});

router.patch('/:id', authorize, function(req, res, next) {
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

router.delete('/:username', authorize, function(req, res, next) {
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
