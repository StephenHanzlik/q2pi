'use strict';

(function() {

  // $('#signin').submit((event) => {
  $('#signup-btn').click((event) => {

    event.preventDefault();

    const email = $('#inputEmail').val().trim();
    const username = $('#inputName').val().trim();
    const password = $('#inputPassword').val().trim();;

    if (!email) {
      //return toastr.warning('Email must not be blank', 3000);
      console.log('no email');
    }

    if (!password) {
      //return toastr.warning('Password must not be blank', 3000);
      console.log('no password');
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ email, username, password }),
      dataType: 'json',
      type: 'POST',
      url: '/users'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/user-landing.html';
      })
      .fail(($xhr) => {
        //toastr.warning($xhr.responseText, 3000);
        console.log("sign up fail");
      });
  });
})();
