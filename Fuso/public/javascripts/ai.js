/* Given a Map, a Start location and an End location, infers any missing traffic
data in the map through the use of logic and various heuristics. Returns an
updated list of edges (streets)*/
function infer(map) {
  var edges = map.streets;
  var vertices = map.intersections;
  var finished = false;
  var iterations = 0;
  var i;
  var j;

  while (!finished) {
    iterations++;
    for (i = 0; i < edges.length; i++) {
      if (edges[i].trafficLevel == 0) {
        var farEndStreets = edges[i].farEnd.streetList;
        var nearEndStreets = edges[i].nearEnd.streetList;
        var relevantStreets = farEndStreets.concat(nearEndStreets);
        var inferedTrafficLevel = 0;

        for(j = relevantStreets.length; j--;) {
          if(relevantStreets[j] === edges[i]) {
              relevantStreets.splice(j, 1);
          }
        }

        // If a street in the streetList has trafficLevel 0, delay infering
        // If num iterations > 3, infer even if a street in the streetlist has trafficLevel 0
        if (completeTrafficData(relevantStreets) || (iterations > 3)) {
          inferedTrafficLevel = Math.round(average(relevantStreets));
        }

        if (inferedTrafficLevel > 0) {
          edges[i].trafficLevel = inferedTrafficLevel
        }
        else if (inferedTrafficLevel < 0) {
          console.log("Error.");
        }
      }
    }
    finished = completeTrafficData(edges);
  }

  return edges;
}

/* Given an edge and a list of relevant edges, computes a trafficLevel for
the given edge that is simply the average trafficLevel of the relevant edges */
function average(edgeList) {
  var numEdges = edgeList.length;
  var totalTraffic = 0;
  var i;

  for (i = 0; i < numEdges; i++) {
    totalTraffic = totalTraffic + edgeList[i].trafficLevel;
  }

  return (totalTraffic / numEdges);
}

/* Given a list of edges, returns true if every edge has a trafficLevel value
greater than zero (no traffic data is missing), otherwise returns false */
function completeTrafficData(edgeList) {
  var complete = true;
  var i;

  for (i = 0; i < edgeList.length; i++) {
    if (edgeList[i].trafficLevel == 0)
      complete = false;
  }

  return complete;
}

/* Given a Map, a Start location and an End location, computes a path from
Start to End that yeilds the least amount of traffic */
function route(map, start, end) {

}
