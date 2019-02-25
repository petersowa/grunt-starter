console.log('loaded app.js, test 2');

$('input').val('');

$('input').bind('input', function() {
  const numeric = /\d+/;
  console.log(this.value.match(numeric));
  this.value = this.value.match(numeric);
});
