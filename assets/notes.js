$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var note = {name: item.val()};

      $.ajax({
        type: 'POST',
        url: '/notes',
        data: note,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

});
