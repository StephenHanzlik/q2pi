'use strict';
(function() {

  // $('#signin').submit((event) => {
  $('#signin-btn').click((event) => {

    console.log("submit");
    event.preventDefault();

    const email = $('#inputEmail').val().trim();
    const password = $('#inputPassword').val();

    if (!email) {
      // return Materialize.toast('Email must not be blank', 3000);
      console.log('no email')
    }

    if (!password) {
      // return Materialize.toast('Password must not be blank', 3000);
      console.log('no password');
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/user-index.html';
      })
      .fail(($xhr) => {
        // Materialize.toast($xhr.responseText, 3000);
        console.log("sign in fail");
      });
  });
})();
