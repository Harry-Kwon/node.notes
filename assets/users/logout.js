$(document).ready(function(){

  //check login details and redirect to profile page
  $('form').on('submit', function(){
    try{
      let formData={};
      formData.username=$(this).find('.username-input').val();
      formData.password=$(this).find('.password-input').val();
      console.log(window.location.href);
      console.log(formData);
      $.ajax({
        type: 'POST',
        url: '/users/action/logout',
        data: formData,
        success: function(data){
          console.log('login successful');
        }
      });
    } catch(err){
      console.log(err);
      return false;
    }
    return false;
  });
  
});
