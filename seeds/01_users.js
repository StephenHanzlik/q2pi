'use strict';

exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'eggs',
          password: '$2a$06$KrJ7ldWf2grQN.9SlIjRieJ3RMBe3KCB.7Euq0uU24iKrZ2yqU0Vy',
          email: 'dinkydinky@gmail.com',
          created_at: new Date('2016-12-06 14:26:16 UTC')
        }),
        knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
      ]);
    });
};
