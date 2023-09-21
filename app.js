var map = L.map('map').fitWorld();
var marker, circle;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 3,
    attribution: '© OpenStreetMap',
    noWrap: true,
}).addTo(map);

function handlePermissionLocation() {
    navigator.permissions.query({name: "geolocation"}).then((result) => {
        if (result.state === 'granted'){
            if (navigator.geolocation){
                navigator.geolocation.watchPosition(getPosition, null, options)
            } else {
                window.alert('Brak wsparcia geolokalizacji')
            }
        } else if (result.state === 'denied'){
            window.alert('Brak uprawnień do śledzenia geolokalizacji')
        }
    })
        .catch(() => {
            window.alert('Błąd z uprawnieniami geolokalizacji')
        })
}

function getPosition(pos){
    console.log(pos.coords)
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

handlePermissionLocation()




