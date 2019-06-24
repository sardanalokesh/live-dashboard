const fs = require("fs");

const metroCentersFile = "geojson/us-metros.geojson";
const metroCenters = JSON.parse(fs.readFileSync(metroCentersFile, "utf8"));
let previousData;

function metrosData(reset) {
  metroCenters.features.forEach((feature,i) => {
    if (previousData && !reset) {
      let prevVal = parseInt(previousData.features[i].properties.visits);
      let newVal = prevVal + (Math.random() > 0.5 ? -1 : 1)*Math.round(Math.random()*1000);
      feature.properties.visits = newVal > 0 ? newVal : 100;
    } else {
      feature.properties.visits = Math.round(Math.random()*10000);
    }
    feature.properties.name = feature.properties.metro;
  });
  previousData = metroCenters;
  return metroCenters;
}

exports.metrosData = metrosData;
