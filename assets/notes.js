$(document).ready(function(){
	$('.remove').on('click', function(){
    var obj = $(this);
    console.log('clicked remove button');
    console.log('id: '+obj.attr('id'));
    
    var noteData = {id: obj.attr('id')};
    
    $.ajax({
      type: 'Post',
      url: '/todo',
      data: noteData,
      success: function(data){
        obj.parent().remove();
      }
    });
    
  });
  
	$('.edit').on('click', function(){
    console.log('clicked edit button');
    console.log('id: '+$(this).attr('id'));
  });
});