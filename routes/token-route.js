'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = 'my_awesome_cookie_signing_key';


router.get('/', function(req, res, next) {
    jwt.verify(req.cookies.token, privateKey, function(err, decoded) {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

router.post('/', function(req, res, next) {
    const bodyObj = {
        email: req.body.email,
        password: req.body.password,
    };

    var errObj = {
        email: boom.create(400, 'Email must not be blank'),
        password: boom.create(400, 'Password must not be blank')
    };
    for (var key in bodyObj) {
        if (!(bodyObj[key])) {
            next(errObj[key]);
            return;
        }
    }

    knex('users')
        .where('email', bodyObj.email)
        .first()
        .then((result) => {
            if (result) {
                if (bcrypt.compareSync(bodyObj.password, result.password)) {
                    delete result.password;
                    delete result.created_at;
                    // var authenticated_user = (result);
                    var token = jwt.sign(req.body.email, privateKey);
                    res.cookie('token', token, {
                        httpOnly: true
                    }).send(result);
                } else {
                    // bad password (says email or password to satisfy the test)
                    next(boom.create(400, 'Bad email or password'));
                }
            } else {
                // bad email (says email or password to satisfy the test)
                next(boom.create(400, 'Bad email or password'));
            }
        })
        .catch((err) => {
            next(err);
        });
});

// DELETE
router.delete('/', (req, res, next) => {
res.clearCookie('token').send(true);
});




module.exports = router;
