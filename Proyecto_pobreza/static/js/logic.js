const geoData1 = "http://127.0.0.1:5000/pob_data";
const geoData2 = "http://127.0.0.1:5000/json_map";


// Creating map object
var myMap = L.map("map", {
    center: [19.43, -99.13],
    zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);


let geojson;


d3.select("#dd").on("change", change)

function change() {

    d3.json(geoData1, function(data) {

        let pob_data;

        pob_data = data;
        console.log(pob_data)
        d3.json(geoData2, function(data) {

            for (i = 0; i < data.features.length; i++) {

                let ent = data.features[i].properties.admin_name;
                let sel = document.getElementById('dd');
                let year = sel.options[sel.selectedIndex].value

                Object.keys(pob_data).forEach(key => {
                    if (pob_data[key].a_o == year) {
                        if (pob_data[key].entidad_federativa == ent) {
                            data.features[i].properties.cartodb_id = pob_data[key].poblacion_en_situacion_de_pobreza;
                        }
                    }
                });

            };

            // Create a new choropleth layer
            geojson = L.choropleth(data, {

                // Define what  property in the features to use
                valueProperty: "cartodb_id",

                // Set color scale
                scale: ["#ffffb2", "#b10026"],

                // Number of breaks in step range
                steps: 10,

                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8
                },

                // Binding a pop-up to each layer
                onEachFeature: function(feature, layer) {
                    layer.bindPopup("<h3>" + feature.properties.admin_name + "<h3>" + "<br>Poblacion:<br>" +
                        +feature.properties.pop_admin);
                }
            }).addTo(myMap);

            // Set up the legend


            var legend = L.control({ position: "bottomright" });
            legend.onAdd = function() {
                d3.select(".legend").remove();
                var div = L.DomUtil.create("div", "legend");
                var limits = geojson.options.limits;
                var colors = geojson.options.colors;
                var labels = [];

                // Add min & max
                var legendInfo = "<h4>Nivel de Pobreza por Entidad</h4>" +
                    "<div class=\"labels\">" +
                    "<div class=\"min\">" + limits[0] + "</div>" +
                    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
                    "</div>";
                div.innerHTML = "";
                div.innerHTML = legendInfo;

                limits.forEach(function(limit, index) {
                    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
                });

                div.innerHTML += "<ul>" + labels.join("") + "</ul>";
                return div;
            };

            // Adding legend to the map
            legend.addTo(myMap);

        });

    });
}