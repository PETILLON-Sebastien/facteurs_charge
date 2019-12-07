# Facteurs de charge

Ceci est le projet de démonstration des facteurs de charge du parc électrique français.

## Environnement

Quelques instructions pour mettre en place l'environnement de travail

### Front-end

Lancez la commande suivante dans le dossier `fullstack_facteurs_charge\static` :

```npm i webpack --save-dev```

Installez les dépendances :

```npm install```

Et mettez en place babel :

```npm i @babel/preset-env @babel/preset-react --save-dev```

```npm install babel-loader```

```npm install --save-dev @babel/core @babel/preset-env```

Pour exécuter le front-end, lancez la commande
```npm run watch```
puis ouvrez le fichier `index.html`.

### Back-end

Créez un environement virtuel python. Pour ce faire, installez virtualenv (python nécessaire) :
```pip install virtualenv```

Créez l'environnement virtuel :
```virtualenv server\```

Installez Flask :
```pip install -U Flask```

Pour exécuter le back-end, lancez la commande
```python server.py```
