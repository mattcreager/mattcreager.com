var coords = new google.maps.LatLng(44.63236390, -63.68475460000001);

var mapOptions = {
    center: coords,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

var marker = new google.maps.Marker({
    position: coords, 
    map: map,
    title: "Hello World!"
});

var pinIcon = new google.maps.MarkerImage(
    "img/me-head.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(64, 64)
);  

marker.setIcon(pinIcon);