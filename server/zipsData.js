const fs = require("fs");

const zipCentersFile = "geojson/zipCenters.geojson";
const zipCenters = JSON.parse(fs.readFileSync(zipCentersFile, "utf8"));

function zipsData() {
  const cat1 = Math.round(Math.random() * 90000);
  const cat2 = Math.round(Math.random() * 90000);
  const cat3 = Math.round(Math.random() * 90000);
  const cat4 = Math.round(Math.random() * 90000);
  const cat5 = Math.round(Math.random() * 90000);
  zipCenters.features.forEach((feature, i) => {
    const zip = parseInt(feature.properties.name);
    if (doesZipLieInCategory(zip, cat1) || doesZipLieInCategory(zip, cat2) || doesZipLieInCategory(zip, cat3) || doesZipLieInCategory(zip, cat4) || doesZipLieInCategory(zip, cat5)) {
      feature.properties.visits = 7000 + Math.round(Math.random() * 3000);
    } else {
      feature.properties.visits = Math.round(Math.random() * 5000);
    }
  });
  return zipCenters;
}

/**
 * @return {boolean}
 */
function doesZipLieInCategory(zip, cat) {
  return zip >= cat && zip < cat + 2000;
}

exports.zipsData = zipsData;
