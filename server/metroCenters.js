const fs = require("fs");
const center = require("@turf/center").default;

const GEOJSON_FILE = "geojson/us-metros.geojson";
const geojson = JSON.parse(fs.readFileSync(GEOJSON_FILE, "utf-8"));

geojson.features = geojson.features.map(feature => center(feature, {
    properties: {
        name: feature.properties.metro
    }
}));

fs.writeFileSync("geojson/metroCenters.geojson", JSON.stringify(geojson), "utf8");