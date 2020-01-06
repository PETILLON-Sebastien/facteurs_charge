# -*-coding:Latin-1 -*
from flask import Flask, render_template
import requests
import arrow
import json
import time
app = Flask(__name__, static_folder="static", template_folder="static")

# Informations générales
nombre_region = 12
nombre_donnees_par_heure = 4
nombre_heures = 25
global periode_rafraichissement
periode_rafraichissement = 5

# Gestion des données
global dernier_appel
dernier_appel = None
global donnees
donnees = None
global sources_energie
sources_energie = ['thermique', 'nucleaire', 'solaire', 'eolien', 'hydraulique', 'bioenergies']
global autres_donnees
autres_donnees = ['ech_physiques', 'consommation']

def init_donnees():
    global donnees
    donnees = {
        '0': {},
        '11': {},
        '24': {},
        '27': {},
        '28': {},
        '32': {},
        '44': {},
        '52': {},
        '53': {},
        '75': {},
        '76': {},
        '84': {},
        '93': {}
    }
    for region_key in donnees.keys():
        donnees[region_key]['capacites'] = {}
        donnees[region_key]['evolution'] = []
    donnees['0']['capacites'] = {}
    donnees['0']['evolution'] = []
    
def appel_necessaire():
    global dernier_appel
    global periode_rafraichissement
    return dernier_appel is None or dernier_appel < arrow.now().shift(minutes=-periode_rafraichissement)

def calculs_regionaux(donnees_regional):
    global donnees
    global sources_energie
    global autres_donnees

    # Copie et calcul des donnees pour chaque enregistrement
    for record in reversed(donnees_regional['records']):
        ligne_donnee = record['fields']
        nouvelle_donnee = {
            'date_heure': ligne_donnee['date_heure'], 
            'libelle_region': ligne_donnee['libelle_region']
        }
        donnees_region = donnees[str(ligne_donnee['code_insee_region'])]
        for source_energie in sources_energie:
            cle_tch = 'tch_' + source_energie

            if source_energie in ligne_donnee:
                nouvelle_donnee[source_energie] = float(ligne_donnee[source_energie])
            if cle_tch in ligne_donnee:
                nouvelle_donnee[cle_tch] = float(ligne_donnee[cle_tch])
            
            source_energie_non_calculee = source_energie not in donnees_region['capacites']
            source_energie_calculable = source_energie in nouvelle_donnee and cle_tch in nouvelle_donnee and nouvelle_donnee[cle_tch] > 0
            if source_energie_non_calculee and source_energie_calculable:
                capacite = nouvelle_donnee[source_energie] / nouvelle_donnee[cle_tch] * 100
                donnees_region['capacites'][source_energie] = capacite

        for autre_donnee in autres_donnees:
            if autre_donnee in ligne_donnee:
                nouvelle_donnee[autre_donnee] = float(ligne_donnee[autre_donnee])
        
        donnees_region['evolution'].append(nouvelle_donnee)
    
    # Calcul du plus petit nombre de donnees pour une region
    nombre_resultats_min = nombre_donnees_par_heure * nombre_heures
    for key in donnees:
        if key != '0':
            ligne = donnees[key]
            nombre_resultats = len(ligne['evolution']) - 1
            if key != '0' and nombre_resultats < nombre_resultats_min:
                nombre_resultats_min = nombre_resultats

    # Conservation du meme nombre de donnees pour chacune des regions
    for key in donnees:
        if key != '0':
            ligne = donnees[key]
            nombre_resultats = len(ligne['evolution'])
            difference = nombre_resultats - nombre_resultats_min
            if difference > 0:
                del ligne['evolution'][0:difference-1]

def calculs_nationaux():
    global donnees
    global sources_energie
    global autres_donnees

    # Construction de la structure avec heures au national
    nombre_resultats = len(donnees['11']['evolution'])
    for i in range(0, nombre_resultats):
        donnees['0']['evolution'].append({
            'date_heure': donnees['11']['evolution'][i]['date_heure']
        })

    # Calcul des données agrégées depuis le regional
    for source_energie in sources_energie:
        capacite_source = 0
        for region_key in donnees.keys():
            if source_energie in donnees[region_key]['capacites']:
                capacite_source += donnees[region_key]['capacites'][source_energie]
        donnees['0']['capacites'][source_energie] = capacite_source

        for i in range(0, nombre_resultats):
            valeur_source = 0
            for region_key in donnees.keys():
                evolutions = donnees[region_key]['evolution']
                if source_energie in evolutions[i]:
                    valeur_source += evolutions[i][source_energie]
            donnees['0']['evolution'][i][source_energie] = valeur_source
            cle_tch = 'tch_' + source_energie
            if donnees['0']['capacites'][source_energie] == 0:
                donnees['0']['evolution'][i][cle_tch] = 0
            else:
                donnees['0']['evolution'][i][cle_tch] = valeur_source / donnees['0']['capacites'][source_energie] * 100

    # Calcul de la consommation et des echanges
    for autre_donnee in autres_donnees:
        for i in range(0, nombre_resultats):
            valeur_donnee = 0
            for region_key in donnees.keys():
                if autre_donnee in donnees[region_key]['evolution'][i]:
                    valeur_donnee += float(donnees[region_key]['evolution'][i][autre_donnee])
            donnees['0']['evolution'][i][autre_donnee] = valeur_donnee

def calcul_meilleur_facteur():
    global donnees
    tch_prefix = 'tch_'
    for code_insee_region in donnees:
        donnee = donnees[code_insee_region]
        donnees[code_insee_region]['meilleur_facteur'] = []
        for donnee_courante in donnee['evolution']:
            meilleure_valeur = 0.
            meilleure_cle = None
            for cle in donnee_courante:
                if cle.find(tch_prefix) != -1:
                    if float(donnee_courante[cle]) > meilleure_valeur:
                        meilleure_valeur = donnee_courante[cle]
                        meilleure_cle = cle[len(tch_prefix):]
            donnees[code_insee_region]['meilleur_facteur'].append(meilleure_cle)
                    

API_RESEAUX_ENERGIE = "https://opendata.reseaux-energies.fr/api/records/1.0/search/"

def sauver(reponse_serveur):
    with open(str(int(round(time.time() * 1000))) + '-data.json', 'w') as f:
        json.dump(reponse_serveur, f)

def mise_a_jour_donnees():
    r = requests.session()
    date_max = arrow.now(tz='Europe/Paris')
    date_min = date_max.shift(hours= - nombre_heures)
    formatte_max = date_max.format('YYYY-MM-DDTHH:mm')
    formatte_min = date_min.format('YYYY-MM-DDTHH:mm')

    params_regional = {
        'dataset': 'eco2mix-regional-tr',
        'facet': 'nature',
        'refine.nature': "Donn\u00e9es temps r\u00e9el",
        'sort': 'date_heure',
        'q': 'date_heure >= {} AND date_heure <= {}'.format(formatte_min, formatte_max),
        'timezone': 'Europe/Paris',
        'rows': nombre_region * nombre_donnees_par_heure * nombre_heures
    }
    reponse_regional = r.get(API_RESEAUX_ENERGIE, params=params_regional)
    print(reponse_regional)
    donnees_regional = json.loads(reponse_regional.content)
    
    # Utile pour du debug
    # sauver(donnees_regional)

    init_donnees()
    calculs_regionaux(donnees_regional)
    calculs_nationaux()

@app.route("/")
def index():

    if appel_necessaire():
        global dernier_appel
        dernier_appel = arrow.now()
        mise_a_jour_donnees()
        calcul_meilleur_facteur()

    global donnees
    return render_template("index.html", donnees=donnees)

if __name__ == "__main__":
    app.run()