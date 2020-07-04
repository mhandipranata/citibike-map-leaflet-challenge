// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

// Create the createMap function
function createMap(bikeStations){
  var lightmap = 
  // Create the tile layer that will be the background of our map
    // L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //   maxZoom: 18,
    //   id: "mapbox.light",
    //   accessToken: API_KEY
    // });

    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // tileSize: 512,
    // zoomOffset: -1,
    // accessToken: API_KEY
    // });

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};


// Create the createMarkers function
function createMarkers(response){

  // Pull the "stations" property off of response.data
  var stations = response["data"]["stations"];

  // Initialize an array to hold bike markers
  // var bikeMarkers = [];
  var bikeMarkers = L.markerClusterGroup();

  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name

    for (var index = 0; index < stations.length; index++){
      
      var station = stations[index];

      // Add the marker to the bikeMarkers array
      bikeMarkers.addLayer(L.marker([station["lat"], station["lon"]])
        .bindPopup(`<h2>${station["name"]}</h2><hr><h3>Capacity: ${station["capacity"]}</h3>`));
    
      // Add the marker to the bikeMarkers array
      // var bikeMarker = L.marker([station["lat"], station["lon"]])
      //   .bindPopup(`<h2>${station["name"]}</h2><hr><h3>Capacity: ${station["capacity"]}</h3>`);
    
      // bikeMarkers.push(bikeMarker);
    };

  // Create a layer group made from the bike markers array, 
  // pass it into the createMap function
  // var bikeStations = L.layerGroup(bikeMarkers);

  // var bikeStations = myMap.addLayer(bikeMarkers);

  createMap(bikeMarkers);
};


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);