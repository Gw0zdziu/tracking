var map = L.map('map').fitWorld();
var marker, circle;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

if (!navigator.geolocation){
    alert('Brak obsługi geolokalizacji')
} else {
    var id = navigator.geolocation.watchPosition(getPosition, null, options)
}

function getPosition(pos){
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var accuracy = pos.coords.accuracy;
    if (marker) {
        map.removeLayer(marker);
    }
    if (circle){
        map.removeLayer(circle);
    }
    marker = L.marker([lat, long])
    circle = L.circle([lat, long], {radius: accuracy})
    var featureGroup = L.featureGroup([marker, circle]).addTo(map);
    map.fitBounds(featureGroup.getBounds())
}




