from flask import Flask, render_template
import requests
import arrow
import json
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# Charger les capacites installées
fichier_capacites = open('data/puissances_installees.json', 'r')
capacites_installees = fichier_capacites.read()
fichier_capacites.close()
print(capacites_installees)

# Variables globales
API_RESEAUX_ENERGIE = "https://opendata.reseaux-energies.fr/api/records/1.0/search/"

@app.route("/")
def index():
    r = requests.session()
    date = arrow.now(tz='Europe/Paris')
    formatte = date.format('YYYY-MM-DDTHH:mm')

    params = {
        'dataset': 'eco2mix-national-tr',
        'q': 'date_heure <= {}'.format(formatte),
        'timezone': 'Europe/Paris',
        'rows': 1
    }
    reponse = r.get(API_RESEAUX_ENERGIE, params=params)
    donnees = json.loads(reponse.content)
    print(donnees)

    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()