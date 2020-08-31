$('.delete-box').on('submit', 'form', function(e){
  let opcion = confirm('Are you sure you want to delete this poll?');
  if (opcion === true) {
    this.submit();
  } else {
    e.preventDefault();
  }
});

