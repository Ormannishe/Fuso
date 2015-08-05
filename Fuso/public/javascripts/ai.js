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
          if (document.getElementById('avg').checked) {
            inferedTrafficLevel = Math.round(average(relevantStreets));
          }
          else if(document.getElementById('dist').checked) {
            inferedTrafficLevel = Math.round(distance(relevantStreets, edges[i].nearEnd, edges[i].farEnd));
          }
          else if(document.getElementById('type').checked) {
            inferedTrafficLevel = Math.round(streetType(relevantStreets, edges[i].type));
          }
          else if(document.getElementById('all').checked) {
            inferedTrafficLevel = Math.round(maximumInferring(relevantStreets, edges[i].nearEnd, edges[i].farEnd, edges[i].type));
          }
          else {
            console.log("Error.")
          }
        }

        if (inferedTrafficLevel > 0) {
          if (inferedTrafficLevel > 100) {
            inferedTrafficLevel = 100; //Maximum trafficLevel is 100
          }
          edges[i].trafficLevel = inferedTrafficLevel
        }
        else if (inferedTrafficLevel < 0) {
          console.log("Error.");
        }
      }
    }
    finished = completeTrafficData(edges);
    if (iterations > 100) {
      finished = true;
    }
  }

  return edges;
}

/* Given a list of relevant edges, computes a trafficLevel for a given edge
that is simply the average trafficLevel of the relevant edges */
function average(edgeList) {
  var numEdges = edgeList.length;
  var totalTraffic = 0;
  var i;

  for (i = 0; i < numEdges; i++) {
    totalTraffic = totalTraffic + edgeList[i].trafficLevel;
  }

  return (totalTraffic / numEdges);
}

/* Given a list of relevant edges and the near and far end intersections of a
given edge, computes a trafficLevel for the given edge that is the average
trafficLevel of the relevant edges, where relevant edges of a lower distance
from the given edge are weighted more heavily in the calulation */
function distance(edgeList, near, far) {
  var numEdges = edgeList.length;
  var totalTraffic = 0;
  var midPoint = [(near.location[0] + far.location[0]) / 2,
                  (near.location[1] + far.location[1]) / 2]
  var i;

  for (i = 0; i < numEdges; i++) {
    // Calculate location of edgeList[i] using its near and far ends
    // Add (edgeList[i].trafficLevel / distance) to the totalTraffic
    var mid = [(edgeList[i].nearEnd.location[0] + edgeList[i].farEnd.location[0]) / 2,
               (edgeList[i].nearEnd.location[1] + edgeList[i].farEnd.location[1]) / 2]
    var dist = Math.sqrt(Math.pow(midPoint[0] - mid[0], 2) +
                         Math.pow(midPoint[1] - mid[1], 2))

    if (dist < 1) {
      dist = 1; // Normalize traffic for very nearby streets
    }

    totalTraffic = totalTraffic + (edgeList[i].trafficLevel / dist);
  }

  return (totalTraffic / numEdges);
}

/* Given a list of relevant edges and a street type for a given edge,
computes a trafficLevel for the given edge that is the average trafficLevel
of the relevant edges, weighted by street type */
function streetType(edgeList, type) {
  var numEdges = edgeList.length;
  var totalTraffic = 0;
  var averageTraffic = 0;
  var i;

  for (i = 0; i < numEdges; i++) {
    totalTraffic = totalTraffic + edgeList[i].trafficLevel;
  }

  averageTraffic = (totalTraffic / numEdges);

  switch(type) {
    case "Main-road":
        averageTraffic = averageTraffic + (0.1 * averageTraffic);
        break;
    case "Side-road":
        averageTraffic = averageTraffic - (0.1 * averageTraffic);
        break;
    case "Highway":
        averageTraffic = averageTraffic + (0.1 * averageTraffic);
        break;
    case "One-way":
    averageTraffic = averageTraffic;
    break;
    default:
        averageTraffic = averageTraffic;
   }

   return averageTraffic
}

/* Combines the functionality of average, distance and streetType, attempting to
infer the trafficLevel of a given edge using the average of relevantStreets,
weighted by distance and street type */
function maximumInferring(edgeList, near, far, type) {
  var numEdges = edgeList.length;
  var totalTraffic = 0;
  var averageTraffic = 0;
  var midPoint = [(near.location[0] + far.location[0]) / 2,
                  (near.location[1] + far.location[1]) / 2]
  var i;

  for (i = 0; i < numEdges; i++) {
    var mid = [(edgeList[i].nearEnd.location[0] + edgeList[i].farEnd.location[0]) / 2,
               (edgeList[i].nearEnd.location[1] + edgeList[i].farEnd.location[1]) / 2]
    var dist = Math.sqrt(Math.pow(midPoint[0] - mid[0], 2) +
                         Math.pow(midPoint[1] - mid[1], 2))

    if (dist < 1) {
      dist = 1; // Normalize traffic for very nearby streets
    }

    totalTraffic = totalTraffic + (edgeList[i].trafficLevel / dist);
  }

  averageTraffic = (totalTraffic / numEdges);

  switch(type) {
    case "Main-road":
        averageTraffic = averageTraffic + (0.1 * averageTraffic);
        break;
    case "Side-road":
        averageTraffic = averageTraffic - (0.1 * averageTraffic);
        break;
    case "Highway":
        averageTraffic = averageTraffic + (0.1 * averageTraffic);
        break;
    case "One-way":
    averageTraffic = averageTraffic;
    break;
    default:
        averageTraffic = averageTraffic;
   }

   return averageTraffic
}

/* Given a list of relevant edges and the near end, far end, and type of the
edge in question, computes a traffic level for the edge in question based on its
relevant edges, weighted by how similar it is to each relevant edge */
function similarityInfer(edgeList, near, far, type) {

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
  // Implement Dijkstra's weighted by trafficLevel
}
