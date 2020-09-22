const url = "http://127.0.0.1:5000/pob_data";

d3.json(url).then((importedData) => {
    console.log(importedData)
    var states = importedData.map(entidad => entidad.entidad_federativa);
    console.log(states)
    var distinctStates = [...new Set(states)];
    console.log(distinctStates)
    var year = importedData.map(entidad => entidad.a_o);
    var distinctYears = [...new Set(year)];
    console.log(distinctYears)
    selectState = document.getElementById('selDataset2')
    distinctStates.forEach(state => {
        var option = document.createElement('option');
        option.innerHTML = state
        option.value = state
        selectState.appendChild(option);
    })

    function getData() {
        var dropdownMenu2 = d3.select("#selDataset2");
        var dataset2 = dropdownMenu2.node().value;
        var filteredState = importedData.filter(sample => sample.entidad_federativa == dataset2);
        console.log(filteredState);
        var filteredPercentage = filteredState.filter(sample => sample.tipo === "Miles de personas");
        console.log(filteredPercentage);
        var pib = filteredState.map(data => data.pib_mn_2013);
        console.log(pib_per_capita)
        var sds1 = filteredPercentage.map(data => data.carencia_por_acceso_a_los_servicios_de_salud);
        var sds1_year = filteredPercentage.map(data => data.a_o);
        var ss1 = filteredPercentage.map(data => data.carencia_por_acceso_a_la_seguridad_social);
        var edv1 = filteredPercentage.map(data => data.carencia_por_calidad_y_espacios_de_la_vivienda);
        console.log(edv1)
        var sbv1 = filteredPercentage.map(data => data.carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda);
        var al1 = filteredPercentage.map(data => data.carencia_por_acceso_a_la_alimentacion);
        var pobr_ex = filteredPercentage.map(data => data.poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_extrema_po);
        var ing_inf = filteredPercentage.map(data => data.poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_por_ingres);
        var pt = filteredPercentage.map(data => data.poblacion_total);
        console.log(pt)
        var pib_per_capita = filteredState.map(data => data.pib_mn_2013 / data.poblacion_total);
        console.log(pib_per_capita)
        var rez_ed = filteredPercentage.map(data => data.rezago_educativo);
        var filteredPercentage = filteredState.filter(sample => sample.tipo === "Miles de personas");
        console.log(filteredPercentage);
        var trace1 = {
            x: pib_per_capita,
            y: sds1,
            mode: "markers",
            name: "Carencia Por Acceso a Servicios de Salud",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 20,
                    color: 'grey',
                }
            },
            text: sds1_year
        };
        var trace2 = {
            x: pib_per_capita,
            y: ss1,
            mode: "markers",
            name: "Carencia Por Acceso a la Seguridad Social",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 30,
                    color: 'grey',
                }
            },
            text: (sds1_year)
        };
        var trace3 = {
            x: pib_per_capita,
            y: edv1,
            mode: "markers",
            name: "Carencia Por Calidad y Espacios de la Vivienda",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 30,
                    color: 'grey'
                }
            },
            text: (sds1_year)
        };
        var trace4 = {
            x: pib_per_capita,
            y: sbv1,
            mode: "markers",
            name: "Carencia por Acceso a Servicios Básicos de vivienda",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 30,
                    color: 'grey',
                }
            },
            text: (sds1_year)
        };
        var trace5 = {
            x: pib_per_capita,
            y: rez_ed,
            mode: "markers",
            name: "Carencia Por Rezago Educativo",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 30,
                    color: 'grey',
                }
            },
            text: (sds1_year)
        };
        var trace6 = {
            x: pib_per_capita,
            y: al1,
            mode: "markers",
            name: "Carencia Por Acceso a Alimentación",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 20,
                    color: 'grey',
                }
            },
            text: (sds1_year),
        };
        var trace7 = {
            x: pib_per_capita,
            y: pobr_ex,
            mode: "markers",
            name: "Población Ingresos Menores a Pobreza Extrema",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 20,
                    color: 'grey',
                }
            },
            text: sds1_year
        };
        var trace8 = {
            x: pib_per_capita,
            y: ing_inf,
            mode: "markers",
            name: "Población Ingresos Inferiores a Pobreza Moderada",
            marker: {
                size: pib_per_capita,
                sizemode: 'area',
                sizeref: 50,
                sizemin: 10,
                color: importedData.entidad_federativa
            },
            legend: {
                y: 0.5,
                yref: 'paper',
                font: {
                    family: 'Arial, sans-serif',
                    size: 20,
                    color: 'grey',
                }
            },
            text: sds1_year
        };
        var layout = {
            xaxis: { title: "PIB per cápita" },
            title: {
                text: "<b> Evolución de las Carencias</b> <br>Bianual</b>",
                font: {
                    family: 'Helvetica',
                    size: 30
                }
            },
            yaxis: { title: "Población con carencia (Miles de personas)" },
            height: 600,
            width: 1300,
            showlegend: true,
            legend: {
                "orientation": "h",
                x: 0,
                y: -.2
            }
        };
        // create the data variable 
        var data1 = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout);
    };
    d3.selectAll("#selDataset2").on("change", updateChart1);

    function updateChart1() {
        // Use D3 to select the dropdown menu
        var dropdownMenu2 = d3.select("#selDataset2");
        // Assign the value of the dropdown menu option to a variable
        var dataset2 = dropdownMenu2.node().value;
        console.log(dataset2)
        getData(dataset2);
    }
    getData("2008", "Aguascalientes");
});