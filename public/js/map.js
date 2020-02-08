
var sampleDots = [{loc:{lat: 41.850033, lng: -80.6500523}, size:1},
            {loc:{lat: 31.850033, lng: -90.6500523}, size:2},
            {loc:{lat: 51.850033, lng: -87.6500523}, size:3},
            {loc:{lat: 49.850033, lng: -77.6500523}, size:4}
            ]

var map;
var zipMarkers = [];

function initMap() {
  console.log("making map");
  map = new google.maps.Map(document.getElementById('myMap'), {
    center: {lat: 41.850033, lng: -87.6500523},
    zoom: 4,
    gestureHandling: 'none',
    zoomControl: false,
    disableDefaultUI: true,
    mapTypeId: 'satellite'
  });
  
  map.data.setStyle(function(feature) {
    var magnitude = 1;
    return {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: magnitude
      }
    };
  });
  
  drawSomeDots(sampleDots);
  setTimeout(changeDots, 30);
}

function changeDots(){

  for(var i=0; i < sampleDots.length; i++){
    sampleDots[i].size +=.01;
  }
  updateDots(sampleDots);
  setTimeout(changeDots, 30);

}

function drawSomeDots(dots){
  
  for(var i=0; i < dots.length; i++){
    var marker = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      center:dots[i].loc,
      radius:60000*dots[i].size,
      map: map
    });
    zipMarkers.push({
      marker: marker,
      srcDot: dots[i]
    });
  }
  
}

function updateDots(){

  //console.log(zipMarkers);
  for(var zipMarker in zipMarkers){
  
    zipMarkers[zipMarker].marker.setRadius( 60000*zipMarkers[zipMarker].srcDot.size);
  
  }  

}

