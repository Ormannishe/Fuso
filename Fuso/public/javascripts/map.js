var key = "AgULac03FQ2NuWevZA04WdIKum1YIwsiuhq3uesSw31VRrxuen35hi1ngU4-jd_m";
var map = null;
var start = null;
var end = null;

function initializeMap() {
  // Ottawa (Default)
  var location = new Microsoft.Maps.Location(45.389198,-75.688004);

  map = new Microsoft.Maps.Map(document.getElementById("map"),
                               {credentials: key,
                                center: location,
                                mapTypeId: Microsoft.Maps.MapTypeId.road,
                                zoom: 14});

  Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchModuleLoaded });
  Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: trafficModuleLoaded });
  //alert("The start location " + start + ".");
  //alert("The end location " + end + ".");

  //Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchModuleLoaded });

      /* Create a polyline
      var vertices = new Array(new Microsoft.Maps.Location(45.389198,-75.688004), new Microsoft.Maps.Location(46,-75.688004), new Microsoft.Maps.Location(46,-75));
      var polygoncolor = new Microsoft.Maps.Color(100,100,0,100);
      var polyline = new Microsoft.Maps.Polyline(vertices,{fillColor: polygoncolor, strokeColor: polygoncolor});

      // Add the polyline to the map
      map.entities.push(polyline); */
}

function trafficModuleLoaded() {
  var trafficManager = new Microsoft.Maps.Traffic.TrafficManager(map);
  trafficManager.show();
}

function searchModuleLoaded() {
  var searchManager = new Microsoft.Maps.Search.SearchManager(map);
  var startRequest = {where:"1275 Tintern Drive, Ottawa, Ontario",
                       count: 1,
                       userData: "start",
                       callback:searchCallback,
                       errorCallback:searchError};
  var endRequest = {where:"396 Cooper Street, Ottawa, Ontario",
                       count: 1,
                       userData: "end",
                       callback:searchCallback,
                       errorCallback:searchError};

  searchManager.geocode(startRequest);
  searchManager.geocode(endRequest);
}

function searchCallback(searchResponse, userData) {
  if (userData == "start")
    start = searchResponse.results[0].location;
  else if (userData == "end")
    end = searchResponse.results[0].location;
  else
    alert("An error occurred.");
}

function searchError(searchRequest) {
  alert("An error occurred.");
}

$(document).ready(function() {
  initializeMap();
});
