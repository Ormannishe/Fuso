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
