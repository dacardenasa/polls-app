$(function() {
  $('#add-option').on('click', function(e){
    $('.radios-box').append(
      '<div class="radio-box mb-2">'+
        '<div class="d-flex justify-content-between input-box">' +
          '<input type="text" class="form-control" id="option" name="options[]" placeholder="Option Name" aria-describedby="optionHelp"/>' +
          '<a class="btn-add ml-1" id="btn-delete">' +
            '<i class="fa fa-trash-o" aria-hidden="true"></i>' +
          '</a>' +
        '</div>' +
        '<small id="optionHelp" class="form-text text-danger hide-error")> Option name required </span>' +
      '</div>'
    )
  });

  $('.radios-box').on('click', '#btn-delete', function(e) {
    $(this).parents('.radio-box').remove();
  });
});