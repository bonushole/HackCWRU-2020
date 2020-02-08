let json;

$(document).ready(function() {
  $.getJSON("https://api.myjson.com/bins/17nzvc", function(response) {
    console.log(response);
    json = response;
  });
});