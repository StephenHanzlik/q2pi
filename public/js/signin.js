'use strict';
(function() {

  $('#signin-btn').click((event) => {

    event.preventDefault();

    const email = $('#inputEmail').val().trim();
    const password = $('#inputPassword').val().trim();

    if (!email) {
      return toastr.error('Email must not be blank');
      console.log('no email')
    }

    if (!password) {
      return toastr.error('Password must not be blank');
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
        // window.location.href = '/user-landing.html';
        window.location.href = '/landing';
      })
      .fail(($xhr) => {
        toastr.error($xhr.responseText);
        console.log("sign in fail");
      });
  });
})();
