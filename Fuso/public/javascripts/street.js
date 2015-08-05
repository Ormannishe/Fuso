/*
name = name of the street ex. "Tintern Drive"
farEnd = Intersection connecting to this street with the lowest x coordinate
nearEnd = Intersection conneting to this street with the highest x coordinate
trafficLevel = severity of traffic on this street. From 0 to 100
type = type of street. One-way, Side-road, Main-road, or Highway
*/

function emptyStreet() {
  this.name = "";
  this.farEnd = "";
  this.nearEnd = "";
  this.trafficLevel = 0;
  this.type = "";
};

function partialStreet(name, trafficLevel, type) {
  this.name = name;
  this.farEnd = "";
  this.nearEnd = "";
  this.trafficLevel = trafficLevel;
  this.type = type;
};

function Street(name, nearEnd, farEnd, trafficLevel, type) {
  this.name = name;
  this.nearEnd = nearEnd;
  this.farEnd = farEnd;
  this.trafficLevel = trafficLevel;
  this.type = type;
};

/* Given two intersections, finds a street which is connected to both intersections */
function findStreet(inter1, inter2) {
  var sl1 = inter1.streetList;
  var sl2 = inter2.streetList;

  for (var i = 0; i < sl1.length; i++) {
    var street1 = sl1[i];
    for (var j = 0; j < sl2.length; j++) {
      var street2 = sl2[j];

      if (street1 === street2) {
        return street1;
      }
    }
  }
  console.log("Could not find street.");
}
