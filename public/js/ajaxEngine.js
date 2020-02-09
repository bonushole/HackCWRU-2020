var startDate = Date.parse("October 1, 2018");
var endDate = Date.parse("September 1, 2019");
var cachedData;

var candidates = {
  "P60007168": "Sanders",
  "P00009621": "Warren",
  "P80006117": "Klobuchar",
  "P00010298": "Buttigieg",
  "P80000722": "Biden"
};

var months = {};

var zipsNCoords = [];

var month;

console.log("here");

function retrieveZips(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  console.log("got json");
			var zips = JSON.parse(this.responseText);
			//initializeZipMarkers(zips);
			zipsNCoords = zips;
		}
	};
	xhttp.open("GET", "/js/zips-to-coords.json", true);
	xhttp.send();
	
}

function getCoordsFromZip(zip){

  for(zipCoord in zipsNCoords){
  
    if(zipsNCoords[zipCoord]["zip_code"]==zip){
    
      return zipsNCoords[zipCoord]["loc"];
    
    }
  
  }

}

function retrieveMonth(){
	var xhttp = new XMLHttpRequest();
	
	var key = month;
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  console.log("got json");
			var zips = JSON.parse(this.responseText);
			console.log(zips);
			months[key] = zips;
			updateDots('P60007168',zips['P60007168'])
			//initializeZipMarkers(zips);
		}
	};
	xhttp.open("GET", "/api/donations/?candidateRange=true&dateString="+getSendableDate(slider.value), true);
	xhttp.send();
	
}


function retrieveEverything(){
	console.log("Trying to retrieve everything.");

	$.ajax({
		type: "GET",
		url: "http://localhost:5000/api/donations/",
		data: {
			monthRange: true,
			candidateRange: true,
		},
		success: function(result) {
			console.log(result);
			cachedData = result;
			console.log(cachedData[new Date("2018-10-01")]["P60007168"]);
			updateDots('P60007168', cachedData[new Date("2018-10-01")]["P60007168"]);
		},
	})

	// var xhttp = new XMLHttpRequest();
	
	// var key = month;
	
	// xhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		console.log("got json for retrieving everything");
	// 		let payload = JSON.parse(this.responseText);
	// 		console.log(payload);
	// 		cachedData = JSON.parse(this.responseText);
	// 		console.log(cachedData);
	// 		console.log(cachedData[new Date("2018-10-01")]["P60007168"]);
	// 		// months[key] = zips;
	// 		updateDots('P60007168', cachedData[new Date("2018-10-01")]["P60007168"]);
	// 		// updateDots('P60007168',zips['P60007168'])
	// 		//initializeZipMarkers(zips);
	// 	} else {
	// 		console.log("Retrieving everything failed.");
	// 	}
	// };
	// xhttp.open("GET", "electi.online:8080/api/donations?monthRange=true&candidateRange=true", true);
	// xhttp.send();
	
}


function queryDate(){

  if(zipsNCoords.hasOwnProperty(month)){
    updateDots(months[month]);
  }else{

    retrieveMonth();
  
  }

}


function getReadableDate(day){

  
  var tomorrow = new Date(startDate + (day*1000*60*60*24));
  var fullString = tomorrow.toDateString()
  var splitDate = fullString.split(" ");
  console.log(splitDate);
  var monthYear = splitDate[1] + " " + splitDate[3];
  return monthYear;

}

function getSendableDate(day){

  var tomorrow = new Date(startDate + (day*1000*60*60*24));
  //var fullString = tomorrow.toDateString()
  //var splitDate = fullString.split(" ");
  var strDate = tomorrow.getUTCFullYear() + "-" + (tomorrow.getUTCMonth()+1)+"-01";
  console.log("strdate");
  console.log(strDate);
  //return strDate;
  return "2019-08-01";
}

var slider = document.getElementById("myRange");

var output = document.getElementById("demo");


var range = (endDate - startDate)/(1000*3600*24)

console.log(range);

slider.max=range;



output.innerHTML = getReadableDate(slider.value);


slider.onmouseup = function() {
  
  if(getReadableDate(this.value) != month){
  
    month = getReadableDate(this.value);
    queryDate();
  
  }
  output.innerHTML = getReadableDate(this.value);
}




