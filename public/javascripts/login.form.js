$('#login-form').on('submit', function(e){
  e.preventDefault();
  if ($('#email').val().length > 0 && $('#password').val().length > 0){
    this.submit();
  } else if ($('#email').val().length === 0 && $('#password').val().length === 0){
    $( "#email" ).addClass( 'is-invalid' );
    $( "#emailHelp" ).removeClass( 'hide-error' );
    $( "#emailHelp" ).addClass( 'show-error' );
    $( "#password" ).addClass( 'is-invalid' );
    $( "#passwordHelp" ).removeClass( 'hide-error' );
    $( "#passwordHelp" ).addClass( 'show-error' );
  } else if ($('#email').val().length === 0){
    $( "#email" ).addClass( 'is-invalid' );
    $( "#emailHelp" ).removeClass( 'hide-error' );
    $( "#emailHelp" ).addClass( 'show-error' );
  } else if ($('#password').val().length === 0){
    $( "#password" ).addClass( 'is-invalid' );
    $( "#passwordHelp" ).removeClass( 'hide-error' );
    $( "#passwordHelp" ).addClass( 'show-error' );
  } 
});