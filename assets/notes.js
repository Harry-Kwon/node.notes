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
  
	$('.remove').on('click', function(){
    var obj = $(this);
    var id = obj.attr('id');
    
    $.ajax({
      type: 'DELETE',
      url: '/notes/'+id,
      success: function(data){
        obj.parent().remove();
      }
    });
    return false;
  });
  
	$('.edit').on('click', function(){
    console.log('clicked edit button');
    console.log('id: '+$(this).attr('id'));
  });
});