
var fs = require('fs');

zipsToCoords ={

  zipCoordPairs : fs.readFileSync('./src/data/zips-to-coords.json','utf8'),

  getCoordsFromZip: function(zip){
  
    for(var pair in this.zipCoordPairs){
    
      if(zipCoordPairs[pair].zip = zip){
      
        return zipCoordPairs[pair].coords;
      
      }
    
    }
  
  }  

}

module.exports = zipsToCoords;
