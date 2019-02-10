$(document).ready(function(){
  //check is username is valid when value of username input changes
  $('form').on('submit', function(){
    try{
    let formData={};
    formData.username=$(this).find('.username-input').val();
   	formData.password=$(this).find('.password-input').val();
    console.log(formData);
    $.ajax({
      type: 'POST',
      url: '/users/action/signup',
      data: formData,
      success: function(data){
        console.log('signup successful');
        window.location.href = "./login.html";
      }
    });
    } catch(err){
      console.log(err);
      return false;
    }
    return false;
  });
  
});
