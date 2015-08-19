function statsObject() {
  this.original = [];
  this.starved = [];
  this.inferred = [];
};

function getStats(stats) {
  var numFails = 0;
  var numSuccess = 0;
  for (var i = 0; i < stats.original.length; i++) {
    var val1 = stats.original[i];
    var val2 = stats.starved[i];
    var val3 = stats.inferred[i];

    if (val2 === 0) {
      if (Math.abs(val1 - val3) < 6) {
        numSuccess++;
      }
      else {
        numFails++;
      }
    }
  }

  console.log("Successes:" + numSuccess);
  console.log("Failures:" + numFails);
  console.log("Total:" + (numFails + numSuccess));
  console.log("");
}
