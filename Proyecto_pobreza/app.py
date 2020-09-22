import numpy as np
import os
import requests
import json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup (the database in sql is "pobreza" and the table name is "pob_est_miles")
#################################################
POSTGRES = {
    'user': 'postgres',
    'pw': 'A00806349',
    'db': 'pobreza',
    'host': 'localhost',
    'port': '5432',
}
engine = create_engine('postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Data = Base.classes.pob_est_miles

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/home")
def home():

    return render_template("index.html")

@app.route("/mapa")
def mapa():

    return render_template("mapa.html")

@app.route("/carencias")
def carencias():

    return render_template("carencias.html")

@app.route("/indicadores")
def indicadores():

    return render_template("indicadores.html")

@app.route("/fuentes")
def fuentes():

    return render_template("fuentes.html")

@app.route("/pob_data")
def pob_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of variables"""
    # Query all passengers
    results = session.query(Data.id,
    Data.entidad_federativa, 
    Data.tipo, Data.a_o, 
    Data.poblacion_en_situacion_de_pobreza,
    Data.poblacion_en_situacion_de_pobreza_moderada,
    Data.poblacion_en_situacion_de_pobreza_extrema,
    Data.poblacion_vulnerable_por_carencias_sociales,
    Data.poblacion_vulnerable_por_ingresos,
    Data.poblacion_no_pobre_y_no_vulnerable,
    Data.poblacion_con_al_menos_una_carencia_social,
    Data.poblacion_con_al_menos_tres_carencias_sociales,
    Data.rezago_educativo,
    Data.carencia_por_acceso_a_los_servicios_de_salud,
    Data.carencia_por_acceso_a_la_seguridad_social,
    Data.carencia_por_calidad_y_espacios_de_la_vivienda,
    Data.carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda,
    Data.carencia_por_acceso_a_la_alimentacion,
    Data.poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_extrema_po,
    Data.poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_por_ingres,
    Data.poblacion_total,
    Data.pib_mn_2013,
    Data.pib_mn_corr).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_data
    all_data = []
    for id, entidad_federativa, tipo, a_o, poblacion_en_situacion_de_pobreza, poblacion_en_situacion_de_pobreza_moderada, poblacion_en_situacion_de_pobreza_extrema, poblacion_vulnerable_por_carencias_sociales, poblacion_vulnerable_por_ingresos, poblacion_no_pobre_y_no_vulnerable, poblacion_con_al_menos_una_carencia_social, poblacion_con_al_menos_tres_carencias_sociales, rezago_educativo, carencia_por_acceso_a_los_servicios_de_salud, carencia_por_acceso_a_la_seguridad_social, carencia_por_calidad_y_espacios_de_la_vivienda, carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda, carencia_por_acceso_a_la_alimentacion, poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_extrema_po, poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_por_ingres, poblacion_total, pib_mn_2013, pib_mn_corr in results:
        data_dict = {}
        data_dict["id"] = id
        data_dict["entidad_federativa"] = entidad_federativa
        data_dict["tipo"] = tipo
        data_dict["a_o"] = a_o
        data_dict["poblacion_en_situacion_de_pobreza"] = poblacion_en_situacion_de_pobreza
        data_dict["poblacion_en_situacion_de_pobreza_extrema"] = poblacion_en_situacion_de_pobreza_extrema
        data_dict["poblacion_vulnerable_por_carencias_sociales"] = poblacion_vulnerable_por_carencias_sociales
        data_dict["rezago_educativo"] = rezago_educativo
        data_dict["carencia_por_acceso_a_los_servicios_de_salud"] = carencia_por_acceso_a_los_servicios_de_salud
        data_dict["carencia_por_acceso_a_la_seguridad_social"] = carencia_por_acceso_a_la_seguridad_social
        data_dict["carencia_por_calidad_y_espacios_de_la_vivienda"] = carencia_por_calidad_y_espacios_de_la_vivienda
        data_dict["carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda"] = carencia_por_acceso_a_los_servicios_basicos_en_la_vivienda
        data_dict["carencia_por_acceso_a_la_alimentacion"] = carencia_por_acceso_a_la_alimentacion
        data_dict["poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_extrema_po"] = poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_extrema_po
        data_dict["poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_por_ingres"] = poblacion_con_ingreso_inferior_a_la_linea_de_pobreza_por_ingres
        data_dict["poblacion_total"] = poblacion_total
        data_dict["pib_mn_2013"] = pib_mn_2013
        data_dict["pib_mn_corr"] = pib_mn_corr
        all_data.append(data_dict)

    return jsonify(all_data)

@app.route("/geo_json")
def geo_json():
    req=requests.get('https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json')
    print(type(req.text))
    return req.text

@app.route("/json_map")
def json_map():
    filename = os.path.join(app.static_folder, 'data', 'mexican_states.geojson')
    with open(filename) as test_file:
        data = json.load(test_file)
    
    return data

@app.route("/pob_data2")
def pob_data2():
    filename2 = os.path.join(app.static_folder, 'data', 'pob_data.json')
    with open(filename2) as test_file2:
        data2 = json.load(test_file2)
    
    return data2



if __name__ == '__main__':
    app.run(debug=True)
