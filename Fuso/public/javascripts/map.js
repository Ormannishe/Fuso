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
  var edge3 = new Street("Edge 3", node3, node4, 0, "Main-road");
  var edge4 = new Street("Edge 4", node1, node3, 40, "Main-road");
  var edge5 = new Street("Edge 5", node1, node4, 0, "Main-road");
  var edge6 = new Street("Edge 6", node3, node2, 15, "Main-road");

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

/* Given a newly created map, removes the trafficLevel from x% of its edges,
chosen at random, where x is specified by 'amount' */
function dataStarve(map, amount) {
  var numStreets = map.streets.length;
  var numToStarve = Math.round(numStreets * amount);

  for (var i = 0; i < numToStarve; i++) {
    var streetToStarve = Math.floor(Math.random() * numStreets);

    map.streets[streetToStarve].trafficLevel = 0;
  }
  return;
};

/* A helper function used by the Dijkstra function below. When given an index,
dist, which describes the distance of every given node in nodes from the starting
node (as calculated thus far) and a list of nodes, returns the node in nodes
which has the smallest distance from the starting node. */
function minDist(dist, nodes) {
  var closest = nodes[0];
  var index = 0;
  var i;

  for (i = 0; i < nodes.length; i++) {
    if (dist[nodes[i].name] < dist[closest.name]) {
      closest = nodes[i];
      index = i;
    }
  }

  return index;
};

/* Given a newly created map, generates n number of randomly generated scenarios
where a vehicle must travel between two random points on the map. The best route
is found using Dijkstra's shortest path algorithm, and the edges used have their traffic
level incremented by 1 each time it is used in a scenario */
function generateTraffic(map, n) {
  var i;

  for (i = 0; i < n; i++) {
    var numVerticies = map.intersections.length;
    var startPos = Math.floor(Math.random() * numVerticies);
    var endPos = Math.floor(Math.random() * numVerticies);
    var start = map.intersections[startPos];
    var end = map.intersections[endPos];

    Dijkstra(map, start, end, numVerticies);
  }
  return;
};

/* An implementation of Dijkstra's shortest path algorithm weighted by distance.
When a path from the starting intersection and ending intersection (both chosen
at random) is found, increment the trafficLevel of all streets involved by 1. */
function Dijkstra(map, start, end, numVerticies) {
  var dist = {};
  var prev = {};
  var unvisited = [];
  var infinity = 100000;
  var j;

  dist[start.name] = 0;
  prev[start.name] = null;

  for (j = 0; j < numVerticies; j++) {
    var v = map.intersections[j];
    if (v !== start) {
      dist[v.name] = infinity;
      prev[v.name] = null;
    }

    unvisited.push(v);
  }

  while (unvisited.length > 0) {
    var closestIndex = minDist(dist, unvisited);
    var u = unvisited[closestIndex];

    if (u === end) {
      var s = [];

      while (u !== null) {
        s.push(u);
        u = prev[u.name];
      }

      for (j = 0; j < s.length; j++) {
        if ((j + 1) < s.length) {
          var currStreet = findStreet(s[j], s[j+1]);
          if (currStreet.trafficLevel < 100) {
            currStreet.trafficLevel++;
          }
        }
      }
      return;
    }

    var neighbors = getNeighbors(u);
    unvisited.splice(closestIndex, 1);

    for (j = 0; j < neighbors.length; j++) {
      var v = neighbors[j];

      if (unvisited.indexOf(v) < 0) {
        neighbors.splice(j, 1); // Remove neighbors which do not exist in unvisited
      }
      else {
        var alt = dist[u.name] + getDistance(u, v);

        if (alt < dist[v.name]) {
          dist[v.name] = alt;
          prev[v.name] = u;
        }
      }
    }
  }

  console.log("Did not find shortest path.");
}

/* Step 1 of the process. Create a new map based on the trafficmap model and
generates traffic on it. Outputs the original map for comparison later. */
function initializeMap() {
  var myMap;
  var originalStreets;
  var numSimulations = 0;

  if (document.getElementById('def').checked) {
    myMap = new trafficMap();
  }
  else if(document.getElementById('test').checked) {
    myMap = new defaultMap();
  }
  else {
    console.log("Error.");
  }

  numSimulations = parseInt(document.getElementById('sims').value);

  if (!numSimulations) {
    numSimulations = 0;
  }

  generateTraffic(myMap, numSimulations);
  originalStreets = myMap.streets;
  document.getElementById('outputArea').innerHTML = '<h3>Original Traffic Levels</h3>';

  for (var i = 0; i < originalStreets.length; i++) {
      // TODO Clear out #outputArea list
      $("#outputArea").append('<li class="output">' +
                              "Traffic Level for " +
                              originalStreets[i].name +
                              ": " +
                              originalStreets[i].trafficLevel +
                              "</li>");
  }

  starveMap(myMap);
}

/* Step 2 of the process. Given a map with generated traffic, starves the map
of traffic information. Outputs the starved map for comparison later. */
function starveMap(map) {
  var starvedStreets;
  var starveAmount;

  if(document.getElementById('ten').checked) {
    starveAmount = 0.1;
  }
  else if(document.getElementById('twentyfive').checked) {
    starveAmount = 0.25;
  }
  else if(document.getElementById('fifty').checked) {
    starveAmount = 0.5;
  }
  else if(document.getElementById('seventyfive').checked) {
    starveAmount = 0.75;
  }
  else if(document.getElementById('ninety').checked) {
    starveAmount = 0.9;
  }
  else {
    console.log("Error.");
  }

  dataStarve(map, starveAmount);
  starvedStreets = map.streets;
  document.getElementById('outputArea2').innerHTML = '<h3>Starved Traffic Levels</h3>';

  for (var i = 0; i < starvedStreets.length; i++) {
    $("#outputArea2").append('<li class="output">' +
                             "Traffic Level for " +
                             starvedStreets[i].name +
                             ": " +
                             starvedStreets[i].trafficLevel +
                             "</li>");
  }

  inferMap(map);
}

/* Step 3 of the process. Given a starved map, infers the missing data using AI
techniques. Outputs the new inferred map for comparison to the original map. */
function inferMap(map) {
  var updatedMap;
  var updatedStreets;
  var bestRoute;
  updatedMap = infer(map);
  updatedStreets = updatedMap.streets;
  document.getElementById('outputArea3').innerHTML = '<h3>Inferred Traffic Levels</h3>';

  for (var i = 0; i < updatedStreets.length; i++) {

    $("#outputArea3").append('<li class="output">' +
                             "Traffic Level for " +
                             updatedStreets[i].name +
                             ": " +
                             updatedStreets[i].trafficLevel +
                             "</li>");
  }

  bestRoute = route(updatedMap);
  for (var i = 0; i < bestRoute.length; i++) {
    console.log(bestRoute[i].name);
  }
}

$(document).ready(function() {
   //initializeMap();
});
