var map = L.map('map').fitWorld();
var marker, circle, lat, long, accuracy;
var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
};
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var geo = navigator.geolocation.watchPosition(success, error, options);

function success(pos){
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    if (marker) {
        map.removeLayer(marker)
    }
    marker = L.marker([lat, long])
    var featureGroup = L.featureGroup([marker]).addTo(map);
    map.fitBounds(featureGroup.getBounds())
}

function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}

var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
};

function onLocationFound(e) {
    console.log(navigator.geolocation)
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);3



