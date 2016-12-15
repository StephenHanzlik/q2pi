'use strict';

(function() {

    const $uploadlink = $('#upload-link-btn');

    $uploadlink.click((event) => {
    event.preventDefault();

    const options = {
      dataType: 'json',
      type: 'get',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/get_eggs.html';
      })
      .fail(() => {
        toastr.error('Login or Sign Up to Upload Files. Please try again.', 3000);
      });
});
})();
