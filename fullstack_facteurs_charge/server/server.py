from flask import Flask, render_template
import requests
import arrow
import json
app = Flask(__name__, static_folder="../static", template_folder="../static")

# Informations générales
nombre_region = 12
nombre_donnees_par_heure = 4
nombre_heures = 24
global periode_rafraichissement
periode_rafraichissement = 5

# Gestion des données
global dernier_appel
dernier_appel = None
global donnees
donnees = None
global sources_energie
sources_energie = ['thermique', 'nucleaire', 'solaire', 'eolien', 'hydraulique', 'bioenergies']

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
    for record in donnees_regional['records']:
        ligne_donnee = record['fields']
        nouvelle_donnee = {
            'date_heure': ligne_donnee['date_heure'], 
            'libelle_region': ligne_donnee['libelle_region']
        }
        for source_energie in sources_energie:
            cle_tch = 'tch_' + source_energie

            if source_energie in ligne_donnee:
                nouvelle_donnee[source_energie] = float(ligne_donnee[source_energie])
            if cle_tch in ligne_donnee:
                nouvelle_donnee[cle_tch] = float(ligne_donnee[cle_tch])
            
            source_energie_non_calculee = source_energie not in donnees[ligne_donnee['code_insee_region']]['capacites']
            source_energie_calculable = source_energie in nouvelle_donnee and cle_tch in nouvelle_donnee and nouvelle_donnee[cle_tch] > 0
            if source_energie_non_calculee and source_energie_calculable:
                capacite = nouvelle_donnee[source_energie] / nouvelle_donnee[cle_tch] * 100
                donnees[ligne_donnee['code_insee_region']]['capacites'][source_energie] = capacite
         
        donnees[ligne_donnee['code_insee_region']]['evolution'].append(nouvelle_donnee)

def calculs_nationaux():
    global donnees
    global sources_energie
    
    nombre_resultats = len(donnees['11']['evolution'])
    for i in range(0, nombre_resultats - 1):
        donnees['0']['evolution'].append({
            'date_heure': donnees['11']['evolution'][i]['date_heure']
        })

    for source_energie in sources_energie:
        capacite_source = 0
        for region_key in donnees.keys():
            if source_energie in donnees[region_key]['capacites']:
                capacite_source += donnees[region_key]['capacites'][source_energie]
        donnees['0']['capacites'][source_energie] = capacite_source

        for i in range(0, nombre_resultats - 1):
            valeur_source = 0
            for region_key in donnees.keys():
                if source_energie in donnees[region_key]['evolution'][i]:
                    valeur_source += donnees[region_key]['evolution'][i][source_energie]
            donnees['0']['evolution'][i][source_energie] = valeur_source
            cle_tch = 'tch_' + source_energie
            if donnees['0']['capacites'][source_energie] == 0:
                donnees['0']['evolution'][i][cle_tch] = 0
            else:
                donnees['0']['evolution'][i][cle_tch] = valeur_source / donnees['0']['capacites'][source_energie] * 100

        
API_RESEAUX_ENERGIE = "https://opendata.reseaux-energies.fr/api/records/1.0/search/"

def mise_a_jour_donnees():
    r = requests.session()
    date_max = arrow.now(tz='Europe/Paris')
    date_min = date_max.shift(days=-1)
    formatte_max = date_max.format('YYYY-MM-DDTHH:mm')
    formatte_min = date_min.format('YYYY-MM-DDTHH:mm')

    params_regional = {
        'dataset': 'eco2mix-regional-tr',
        'facet': 'nature',
        'refine.nature': "Données temps réel",
        'sort': 'date_heure',
        'q': 'date_heure >= {} AND date_heure <= {}'.format(formatte_min, formatte_max),
        'timezone': 'Europe/Paris',
        'rows': nombre_region * nombre_donnees_par_heure * nombre_heures
    }
    reponse_regional = r.get(API_RESEAUX_ENERGIE, params=params_regional)
    donnees_regional = json.loads(reponse_regional.content)

    init_donnees()
    calculs_regionaux(donnees_regional)
    calculs_nationaux()

    global donnees
    print(donnees)

@app.route("/")
def index():

    if appel_necessaire():
        global dernier_appel
        dernier_appel = arrow.now()
        mise_a_jour_donnees()

    global donnees
    return render_template("index.html", donnees=donnees)

if __name__ == "__main__":
    app.run()