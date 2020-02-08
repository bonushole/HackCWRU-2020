var startDate = Date.parse("September 30, 2018");
var endDate = Date.parse("September 30, 2019");

var months = []

function retrieveMonths(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			months = JSON.parse(this.responseText);
		}
	};
	xhttp.open("GET", "/api/monthly-donations, true);
	xhttp.send();
	
}


function getReadableDate(day){

  var tomorrow = new Date(startDate + (day*1000*60*60*24));
  var fullString = tomorrow.toDateString()
  var splitDate = fullString.split(" ");
  var monthYear = splitDate[1] + " " + splitDate[3];
  return monthYear;

}

var slider = document.getElementById("myRange");

var output = document.getElementById("demo");


var range = (endDate - startDate)/(1000*3600*24)

console.log(range);

slider.max=range;



output.innerHTML = getReadableDate(slider.value);


slider.oninput = function() {
  output.innerHTML = getReadableDate(this.value);
}


