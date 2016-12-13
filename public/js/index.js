'use strict';
(function() {
  $.getJSON('/uploads')
    .done((files) => {
      for (let file of files) {
        var name = file.name;
        var username = file.username;
        var created_at = file.created_at;
        // TODO: change category to the download_path, category is temporarily being used as the download path for client's 'file download' links
        var path = file.category;
        $('#table tr:last').after('<tr><td><a href="' + path + '" download>' + name + '</a></td><td>' + username + '</td><td>' + created_at + '</td><td class="delete-button">x</td></tr>');
      }
      $('.delete-button').on('click', function(){
        console.log(event.target);
        console.log("clicked");
      });
    })
    .fail(() => {
      console.log("Unable to retrieve files");
    });
})();
 // var deleteButton = document.getElementsByClassName(".delete-button");
 // deleteButton.addEventListener("click", function() {
 //   console.log("clicked");
 // });
  // 
  // var name = file.name;
  // var username = file.username;
  // var created_at = file.created_at;
  // const options = {
  //   contentType: 'application/json',
  //   data: JSON.stringify({ name, username, created_at }),
  //   type: 'DELETE',
  //   url: '/uploads'
  // };
  // $.ajax(options) {
  //
  // }
//}):
