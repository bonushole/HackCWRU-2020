//import cloneDeep from lodash;

//var _ = require("lodash");

var heatmap;

function clone(objectToClone) {
    var cloned = JSON.parse(JSON.stringify(objectToClone));
    return cloned;
}





var sampleDots = [{loc:{lat: 41.850033, lng: -80.6500523}, size:1},
            {loc:{lat: 31.850033, lng: -90.6500523}, size:2},
            {loc:{lat: 51.850033, lng: -87.6500523}, size:3},
            {loc:{lat: 49.850033, lng: -77.6500523}, size:4}
            ]

/*
var sampleDots = {loc:{lat: 41.850033, lng: -80.6500523}, size:1},
            {loc:{lat: 31.850033, lng: -90.6500523}, size:2},
            {loc:{lat: 51.850033, lng: -87.6500523}, size:3},
            {loc:{lat: 49.850033, lng: -77.6500523}, size:4}
            }
*/

var templateMarker;
var zipMarkers = {};

var map;
var allZipMarkers = {

  'blue':{},
  'red':{},
  'green':{},
  'yellow':{},
  'purple':{}

};

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
  
  //drawSomeDots(sampleDots);
  //setTimeout(changeDots, 30);
  
  /*
  setTimeout(function(){
    console.log(JSON.stringify(map.getBounds()))
  },100);
  */
  
  heatmap = new google.maps.visualization.HeatmapLayer({
    data:[]
  });
  heatmap.setMap(map);
  
   
  
  retrieveZips();
  retrieveMonth();
}

function changeDots(){

  for(var i=0; i < sampleDots.length; i++){
    sampleDots[i].size +=.01;
  }
  updateDots(sampleDots);
  setTimeout(changeDots, 30);

}

function initializeZipMarkers(zipsNCoords){

  colors = ['blue','red'];//,'green','yellow','purple'];
    var i = 0;
  //for(var color in colors){
    zipMarkers = {};  
    for(var zip in zipsNCoords){
      if(!zipsNCoords.hasOwnProperty(zip)){
        continue;
      }
      if(zip[0]!='2'){
        continue;
      }
      i++;
      console.log(zip);
      var marker = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.05,
        center:zipsNCoords[zip].loc,
        radius:20000,
        map: map
       });
     zipMarkers[zip]={
       marker: marker
     };
   }
     console.log(i);
    //allZipMarkers[colors[color]]=zipMarkers;
     
  //}
}

function updateDots(color, vals){

  console.log(color);
  console.log(vals);
  console.log(Object.keys(vals).length);
  //allZipMarkers[color];
  for(var val in vals){
  
  
  /*
    if(val[0]%70!=0){
      continue;
    }
  */  
    if(!vals.hasOwnProperty(val)){
      continue;
      //zipMarkers[val].marker.setRadius(60000*val['Amount']);
    }
    //console.log(val);
    if(zipMarkers.hasOwnProperty(val)){
      console.log("updating props");
      zipMarkers[val].marker.weight = vals[val]*.1;
    }else{
      var coords = getCoordsFromZip(val);
      console.log(coords);
      if(coords == undefined){
        continue;
      }
      
      
      var marker = {location:new google.maps.LatLng(coords['lat'], coords['lng']), weight: vals[val]*.1};
      
      heatmap.data.push(marker);
      zipMarkers[val]={
       marker: marker
     };
      /*
      var marker = templateMarker= new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.05,
        center:getCoordsFromZip(val),
        radius:1000*vals[val],//10*vals[val],
        map: map
       });
      //marker.position = vals[val]["loc"]
      
     zipMarkers[val]={
       marker: marker
     };
     */
    }
   
  }
  console.log("done constructing markers");  

}

