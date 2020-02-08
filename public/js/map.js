
var sampleDots = [{loc:{lat: 41.850033, lng: -80.6500523}, size:1},
            {loc:{lat: 31.850033, lng: -90.6500523}, size:2},
            {loc:{lat: 51.850033, lng: -87.6500523}, size:3},
            {loc:{lat: 49.850033, lng: -77.6500523}, size:4}
            ]

var map;
var zipMarkers = [];

var idealBounds = {"south":23.91804631650461,"west":-126.41177104999998,"north":51.20142279408888,"east":-64.88833355};

function initMap() {
  console.log("making map");
  var mapElem = document.getElementById('myMap');
  var elemRect = mapElem.getBoundingClientRect();
  
  var maxZoomX = (elemRect.width/700.0)*4.0;
  var maxZoomY = (elemRect.width/700.0)*4.0;
  
  map = new google.maps.Map(mapElem, {
    center: {lat: 38.850033, lng: -95.6500523},
    gestureHandling: 'none',
    zoomControl: false,
    disableDefaultUI: true,
    zoom:4,
    mapTypeId: 'satellite'
  });
  
  //map.fitBounds(idealBounds);
  
  google.maps.event.addListenerOnce(map, 'idle', function() {
    map.fitBounds(idealBounds,0);
    //console.log(JSON.stringify(map.getBounds()));
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
  //setTimeout(changeDots, 30);
  
  /*
  setTimeout(function(){
    console.log(JSON.stringify(map.getBounds()))
  },100);
  */
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

