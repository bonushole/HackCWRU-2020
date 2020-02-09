let z2c; let cData;
const colors = ["#0000ff", "#ff0000", "#ffff00", "#8357aa", "#00dd00"];
const names = ["sanders", "warren", "buttigieg", "biden", "klobuchar"];


var mymap = L.map('mapid').setView([38.0, -96.0], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(mymap);


function plotMap(result, date, candidates, vis_type) {//vis_type = 1, standart, vis_type = 2, all same size, vis_type = 3, normalized (anti biden)
              console.log("plotting");
              console.log(result);
              cData = result;
              vals1 = cData[new Date(date)]["P60007168"];
              vals2 = cData[new Date(date)]["P00009621"]; 
              vals3 = cData[new Date(date)]["P80006117"];
              vals4 = cData[new Date(date)]["P00010298"];
              vals5 = cData[new Date(date)]["P80000722"];
              let valKeys = Object.keys(vals5);
              for (let i = 0; i < valKeys.length; i++) {
                if (z2c[valKeys[i]] != null) {
                  let lat = z2c[valKeys[i]]["lat"];
                  let lng = z2c[valKeys[i]]["lng"];
                  let a = vals1[valKeys[i]] * candidates[0];
                  let b = vals2[valKeys[i]] * candidates[1];
                  let c = vals3[valKeys[i]] * candidates[2];
                  let d = vals4[valKeys[i]] * candidates[3];
                  let e = vals5[valKeys[i]] * candidates[4];
                  if (!a) {
                    a = 0;
                  }
                  if (!b) {
                    b = 0;
                  }
                  if (!c) {
                    c = 0;
                  }
                  if (!d) {
                    d = 0;
                  }
                  if (!e) {
                    e = 0;
                  }
                  let candList = [a,b,c,d,e];
                  console.log(candList);
                  let max = Math.max(...candList);
                  if (max > 0) {
                    let maxIndex = candList.indexOf(max);
                    console.log("Winner: " + names[maxIndex]);
                    let color = colors[maxIndex];
                    candList.splice(candList.indexOf(max), 1);
                    let secondMax = Math.max(...candList);
                    let delta = max - secondMax;
					if(vis_type == 0){
						let r = delta;
					}else if(vis_type == 1){
						let r = 5000;
					}else{
						let r = 5000 * Math.log(delta/3000 + 1);
					}
	
                    L.circle([lat, lng], {radius: r, color: color}).addTo(mymap);
                  }
                }
              }
              // updateDots('P60007168', cachedData[new Date("2018-10-01")]["P60007168"]);
            }
