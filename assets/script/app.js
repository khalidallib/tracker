'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [0,0],
  zoom: 17,
  pitch: 40
})

const marker = new mapboxgl.Marker({color: 'rgb(0, 120, 255)'});

function getLocation(position) {

  let { altitude, latitude, longitude } = position.coords;
  console.log(`Longitude: ${longitude} | Latitude: ${latitude} | Altitude: ${altitude}`);
  map.setCenter([longitude, latitude]);
  marker.setLngLat([longitude, latitude]).addTo(map)
}

function errorHandler() {
  console.log('Unable to retrieve your location');
}


const options = {
  enableHighAccuracy: true
}

function disabledOptions() {
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
  map.touchZoomRotate.disable();
  map.dragPan.disable();
  
}

function displayPosition() {
  if('geolocation' in navigator) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
  } else {
    console.log('Geolocation is not supported by the brower.')
  }
}

document.getElementById("track_button").addEventListener("click", function() {
  if (marker.getLngLat()) {
    map.easeTo({
      center: marker.getLngLat(),
      zoom: 17,
      pitch: 40,
      essential: true
    })
  }
})

displayPosition();