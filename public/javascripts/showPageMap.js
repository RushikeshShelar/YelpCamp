
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

new mapboxgl.Marker({ color: 'red' })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 10 })
            .setHTML(
                `<h3>${campground.title}</h3>
            ${campground.location}`
            )
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());