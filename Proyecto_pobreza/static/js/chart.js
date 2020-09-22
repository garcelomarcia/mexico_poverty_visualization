// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
const url = "http://127.0.0.1:5000/pob_data";

d3.json(url, d3.autoType).then((importedData) => {
    console.log(importedData)
    var states = importedData.map(entidad => entidad.entidad_federativa);
    var distinctStates = [...new Set(states)];
    var year = importedData.map(entidad => entidad.a_o);
    var distinctYears = [...new Set(year)];


    selectYear = document.getElementById('selDataset')
    distinctYears.forEach(year => {
        var option = document.createElement('option');
        option.innerHTML = year
        option.value = year
        selectYear.appendChild(option);
    })



    function getData(startingYear) {

        var filteredData = importedData.filter(sample => sample.a_o == startingYear);
        console.log(filteredData);
        var filteredPercentage = filteredData.filter(sample => sample.tipo === "Porcentaje");
        var filteredQty = filteredData.filter(sample => sample.tipo === "Miles de personas");
        var filteredAvg = filteredData.filter(sample => sample.tipo === "Carencias promedio");

        var sds1 = filteredPercentage.map(data => data.carencia_por_acceso_a_los_servicios_de_salud);
        var ss1 = filteredPercentage.map(data => data.carencia_por_acceso_a_la_seguridad_social);
        var edv1 = filteredPercentage.map(data => data.carencia_por_calidad_y_espacios_de_la_vivienda);
        var sbv1 = filteredPercentage.map(data => data.carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda);
        var al1 = filteredPercentage.map(data => data.carencia_por_acceso_a_la_alimentacion);

        var sds2 = filteredQty.map(data => data.carencia_por_acceso_a_los_servicios_de_salud);
        var ss2 = filteredQty.map(data => data.carencia_por_acceso_a_la_seguridad_social);
        var edv2 = filteredQty.map(data => data.carencia_por_calidad_y_espacios_de_la_vivienda);
        var sbv2 = filteredQty.map(data => data.carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda);
        var al2 = filteredQty.map(data => data.carencia_por_acceso_a_la_alimentacion);

        var sds3 = filteredAvg.map(data => data.carencia_por_acceso_a_los_servicios_de_salud);
        var ss3 = filteredAvg.map(data => data.carencia_por_acceso_a_la_seguridad_social);
        var edv3 = filteredAvg.map(data => data.carencia_por_calidad_y_espacios_de_la_vivienda);
        var sbv3 = filteredAvg.map(data => data.carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda);
        var al3 = filteredAvg.map(data => data.carencia_por_acceso_a_la_alimentacion);

        sds2 = sds2.map(data => {
            if (typeof data === 'string') {
                data = parseFloat(data.replace(",", ""))
            } else { data = data }
            return data
                // data = parseFloat(data.replace(",",""))

        })
        ss2 = ss2.map(data => {
            if (typeof data === 'string') {
                data = parseFloat(data.replace(",", ""))
            } else { data = data }
            return data
                // data = parseFloat(data.replace(",",""))

        })
        edv2 = edv2.map(data => {
            if (typeof data === 'string') {
                data = parseFloat(data.replace(",", ""))
            } else { data = data }
            return data
                // data = parseFloat(data.replace(",",""))

        })
        sbv2 = sbv2.map(data => {
            if (typeof data === 'string') {
                data = parseFloat(data.replace(",", ""))
            } else { data = data }
            return data
                // data = parseFloat(data.replace(",",""))

        })
        al2 = al2.map(data => {
            if (typeof data === 'string') {
                data = parseFloat(data.replace(",", ""))
            } else { data = data }
            return data
                // data = parseFloat(data.replace(",",""))

        })



        var barChartData1 = {
            labels: distinctStates,
            datasets: [{
                data: sds1,
                label: 'Servicios de Salud',
                backgroundColor: window.chartColors.red

            }, {
                data: ss1,
                label: 'Seguridad Social',
                backgroundColor: window.chartColors.blue
            }, {
                label: 'Espacios de Vivienda',
                backgroundColor: window.chartColors.green,
                data: edv1,
            }, {
                label: 'Servicios Basicos en Vivienda',
                backgroundColor: window.chartColors.brown,
                data: sbv1,
            }, {
                label: 'Acceso a la Alimentacion',
                backgroundColor: window.chartColors.purple,
                data: al1,
            }]

        };
        var barChartData2 = {
            labels: distinctStates,
            datasets: [{
                data: sds2,
                label: 'Servicios de Salud',
                backgroundColor: window.chartColors.red

            }, {
                data: ss2,
                label: 'Seguridad Social',
                backgroundColor: window.chartColors.blue
            }, {
                label: 'Espacios de Vivienda',
                backgroundColor: window.chartColors.green,
                data: edv2,
            }, {
                label: 'Servicios Basicos en Vivienda',
                backgroundColor: window.chartColors.brown,
                data: sbv2,
            }, {
                label: 'Acceso a la Alimentacion',
                backgroundColor: window.chartColors.purple,
                data: al2,
            }]

        };
        var barChartData3 = {
            labels: distinctStates,
            datasets: [{
                data: sds3,
                label: 'Servicios de Salud',
                backgroundColor: window.chartColors.red

            }, {
                data: ss3,
                label: 'Seguridad Social',
                backgroundColor: window.chartColors.blue
            }, {
                label: 'Espacios de Vivienda',
                backgroundColor: window.chartColors.green,
                data: edv3,
            }, {
                label: 'Servicios Basicos en Vivienda',
                backgroundColor: window.chartColors.brown,
                data: sbv3,
            }, {
                label: 'Acceso a la Alimentacion',
                backgroundColor: window.chartColors.purple,
                data: al3,
            }]

        };


        plot(barChartData1, barChartData2, barChartData3);



    }

    function plot(barChartData1, barChartData2, barChartData3) {


        var ctx1 = document.getElementById('canvas').getContext('2d');
        var ctx2 = document.getElementById('canvaas').getContext('2d');
        var ctx3 = document.getElementById('canvaaas').getContext('2d');

        window.myBar1 = new Chart(ctx1, {
            type: 'bar',
            data: barChartData1,
            options: {
                title: {
                    display: true,
                    text: 'Carencias por Estado'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        window.myBar2 = new Chart(ctx2, {
            type: 'bar',
            data: barChartData2,
            options: {
                title: {
                    display: true,
                    text: 'Carencias por Estado'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        window.myBar3 = new Chart(ctx3, {
            type: 'bar',
            data: barChartData3,
            options: {
                title: {
                    display: true,
                    text: 'Carencias por Estado'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });

    }

    d3.selectAll("#selDataset").on("change", updateChart);

    function updateChart() {

        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        window.myBar1.destroy();
        window.myBar2.destroy();
        window.myBar3.destroy();
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.node().value;
        console.log(dataset)
        getData(dataset)

    }
    getData("2008");
});