$(document).ready(function(){
  
  //create new note
  $('form').on('submit', function(){
      var item = $('form input');
      var note = {title: item.val()};

      $.ajax({
        type: 'POST',
        url: '/notes',
        data: note,
        success: function(data){
          //create new note element
          location.reload();
        }
      });
      return false;
  });
  
  //remove note
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
  
  //edit note
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
