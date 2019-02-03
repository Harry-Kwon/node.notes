$(document).ready(function(){
	$('.remove').on('click', function(){
    var obj = $(this);
    var id = obj.attr('id');
    console.log('clicked remove button');
    console.log('id: '+id);
    
    $.ajax({
      type: 'DELETE',
      url: '/todo/'+id,
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