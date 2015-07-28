/* Default map used for testing purposes. Simple, fully connected graph with four
vertices (square) and 6 edges. It is assumed that edges 5 and 6 do not intersect
ex. an overpass/underpass */
function defaultMap() {
  var node1 = new partialIntersection("Node 1", [0, 0]);
  var node2 = new partialIntersection("Node 2", [1, 0]);
  var node3 = new partialIntersection("Node 3", [0, 1]);
  var node4 = new partialIntersection("Node 4", [1, 1]);

  var edge1 = new Street("Edge 1", node1, node2, 27, "Main-road");
  var edge2 = new Street("Edge 2", node2, node4, 86, "Main-road");
  var edge3 = new Street("Edge 3", node4, node3, 0, "Main-road");
  var edge4 = new Street("Edge 4", node3, node1, 40, "Main-road");
  var edge5 = new Street("Edge 5", node1, node4, 0, "Main-road");
  var edge6 = new Street("Edge 6", node2, node3, 15, "Main-road");

  node1.streetList.push(edge1, edge4, edge5);
  node2.streetList.push(edge1, edge2, edge6);
  node3.streetList.push(edge3, edge4, edge6);
  node4.streetList.push(edge2, edge3, edge5);

  this.streets = [edge1, edge2, edge3, edge4, edge5, edge6];
  this.intersections = [node1, node2, node3, node4];
};

function Map(streetList, interList) {
  this.streets = streetList;
  this.intersections = interList;
};

function initializeMap() {
  var myMap = new defaultMap();
  var updatedStreets = infer(myMap);

  for (var i = 0; i < updatedStreets.length; i++) {
      console.log("Traffic Level for " + updatedStreets[i].name + ": " + updatedStreets[i].trafficLevel);
  }
}

$(document).ready(function() {
   initializeMap();
});

// var key = "AgULac03FQ2NuWevZA04WdIKum1YIwsiuhq3uesSw31VRrxuen35hi1ngU4-jd_m";
// var map = null;
// var start = null;
// var end = null;
//
// function initializeMap() {
//   // Ottawa (Default)
//   var location = new Microsoft.Maps.Location(45.389198,-75.688004);
//
//   map = new Microsoft.Maps.Map(document.getElementById("map"),
//                                {credentials: key,
//                                 center: location,
//                                 mapTypeId: Microsoft.Maps.MapTypeId.road,
//                                 zoom: 14});
//
//   Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchModuleLoaded });
//   Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: trafficModuleLoaded });
//   //alert("The start location " + start + ".");
//   //alert("The end location " + end + ".");
//
//   //Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchModuleLoaded });
//
//       /* Create a polyline
//       var vertices = new Array(new Microsoft.Maps.Location(45.389198,-75.688004), new Microsoft.Maps.Location(46,-75.688004), new Microsoft.Maps.Location(46,-75));
//       var polygoncolor = new Microsoft.Maps.Color(100,100,0,100);
//       var polyline = new Microsoft.Maps.Polyline(vertices,{fillColor: polygoncolor, strokeColor: polygoncolor});
//
//       // Add the polyline to the map
//       map.entities.push(polyline); */
// }
//
// function trafficModuleLoaded() {
//   var trafficManager = new Microsoft.Maps.Traffic.TrafficManager(map);
//   trafficManager.show();
// }
//
// function searchModuleLoaded() {
//   var searchManager = new Microsoft.Maps.Search.SearchManager(map);
//   var startRequest = {where:"1275 Tintern Drive, Ottawa, Ontario",
//                        count: 1,
//                        userData: "start",
//                        callback:searchCallback,
//                        errorCallback:searchError};
//   var endRequest = {where:"396 Cooper Street, Ottawa, Ontario",
//                        count: 1,
//                        userData: "end",
//                        callback:searchCallback,
//                        errorCallback:searchError};
//
//   searchManager.geocode(startRequest);
//   searchManager.geocode(endRequest);
// }
//
// function searchCallback(searchResponse, userData) {
//   if (userData == "start")
//     start = searchResponse.results[0].location;
//   else if (userData == "end")
//     end = searchResponse.results[0].location;
//   else
//     alert("An error occurred.");
// }
//
// function searchError(searchRequest) {
//   alert("An error occurred.");
// }
//
// $(document).ready(function() {
//   initializeMap();
// });
