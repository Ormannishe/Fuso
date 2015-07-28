/*
name = name of the street ex. "Tintern Drive"
farEnd = Intersection which connects to the "far side" of this street
nearEnd = Intersection which connects to the "near side" of this street
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

function Street(name, farEnd, nearEnd, trafficLevel, type) {
  this.name = name;
  this.farEnd = farEnd;
  this.nearEnd = nearEnd;
  this.trafficLevel = trafficLevel;
  this.type = type;
};
