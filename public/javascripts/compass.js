$("#btnGet").click(function(event) {
  event.preventDefault();
  let selectOption = $('#sourceSelector option:selected').text();
  console.log(selectOption);
})
