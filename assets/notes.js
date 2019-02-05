$(document).ready(function(){
  
  $('form').on('submit', function(){

      var item = $('form input');
      var note = {title: item.val()};

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
    var id = obj.parent().attr('id');
    
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
    var obj = $(this);
    var id = obj.parent().attr('id');
    var newTitle = obj.parent().children('textarea').val();
    console.log(newTitle);
    $.ajax({
      type: 'PUT',
      url: '/notes/'+id,
      data: {title: newTitle},
      success: function(data){
        //
      }
    });
  });
});