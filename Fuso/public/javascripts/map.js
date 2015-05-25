var key = "AgULac03FQ2NuWevZA04WdIKum1YIwsiuhq3uesSw31VRrxuen35hi1ngU4-jd_m";

function initializeMap() {
    // Ottawa
    var location = new Microsoft.Maps.Location(45.389198,-75.688004);

    var map = new Microsoft.Maps.Map(document.getElementById("map"),
                           {credentials: key,
                            center: location,
                            mapTypeId: Microsoft.Maps.MapTypeId.road,
                            zoom: 14});
}

$(document).ready(function() {
  initializeMap();
});
