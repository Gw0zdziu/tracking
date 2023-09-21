var map = L.map('map').fitWorld();
var marker, circle;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

if (!navigator.geolocation){
    alert('Brak obsługi geolokalizacji')
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000)
}

function getPosition(pos){
    const id = document.getElementById('cord')
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var accuracy = pos.coords.accuracy;
    id.textContent = `lat: ${lat}, long: ${long}, accuracy: ${accuracy}`;
    if (marker) {
        map.removeLayer(marker);
    }
    if (circle){
        map.removeLayer(circle);
    }
    marker = L.marker([lat, long])
    circle = L.circle([lat, long], {radius: accuracy})
    var featureGroup = L.featureGroup([marker]).addTo(map);
    map.fitBounds(featureGroup.getBounds())
}




