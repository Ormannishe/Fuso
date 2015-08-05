/* An Intersection is defined as any location in which two or more streets meet
name = name of the Intersection Ex. "Bank/Hunt Club"
streetList = A list of all intersecting streets at this location
location =  An array containing the x any y location of the intersection on the grid
 */
function emptyIntersection() {
  this.name = "";
  this.streetList = [];
  this.location = [];
};

function partialIntersection(name, location) {
  this.name = name;
  this.streetList = [];
  this.location = location;
};

function Intersection(name, streetList, location) {
  this.name = name;
  this.streetList = streetList;
  this.location = location;
};

/* Given an intersection, return all neighbor intersections */
function getNeighbors(inter) {
  var neighbors = [];
  var edges = inter.streetList;
  var i;

  for (i = 0; i < edges.length; i++) {
    if (edges[i].farEnd === inter) {
      neighbors.push(edges[i].nearEnd)
    }
    else if (edges[i].nearEnd === inter) {
      neighbors.push(edges[i].farEnd)
    }
    else {
      console.log("Error.")
    }
  }

  return neighbors;
}

/* Given two intersections, returns the distance between them. */
function getDistance(inter1, inter2) {
  var loc1 = inter1.location;
  var loc2 = inter2.location;
  var dist = Math.sqrt(Math.pow(loc2[0] - loc1[0], 2) +
                       Math.pow(loc2[1] - loc1[1], 2));

  return dist;
}
