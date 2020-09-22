// Read data from endpoint Pob_data
const url = "http://127.0.0.1:5000/pob_data";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Read data from endpoint geo_json
const url2 = "http://127.0.0.1:5000/geo_json";

// Fetch the JSON data and console log it
d3.json(url2).then(function(geo_data) {
    console.log(geo_data);
});

// Promise Pending
const dataPromise = d3.json(url2);
console.log("Data Promise: ", dataPromise);