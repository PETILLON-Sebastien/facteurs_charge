# Facteurs de charge

Ceci est le projet de démonstration des facteurs de charge du parc électrique français.

## Environnement

Quelques instructions pour mettre en place l'environnement de travail

### Front-end

Lancez la commande suivante dans le dossier `fullstack_facteurs_charge\server\static` :

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

Tout d'abord, installez nodejs.

Positionnez-vous dans le dossier `fullstack_facteurs_charge\server` :

Installez les dépendances :

```npm install```

Pour exécuter le back-end, lancez la commande
```node server.py```

### Précisions

Correspondances code_insee_region / nom région :
11 : Ile-de-France
24 : Centre-Val de Loire
27 : Bourgogne-Franche-Comté
28 : Normandie
32 : Hauts-de-France
44 : Grand-Est
52 : Pays de la Loire
53 : Bretagne
75 : Nouvelle-Aquitaine
76 : Occitanie
84 : Auvergne-Rhône-Alpes
93 : Provence-Alpes-Côte d'Azur
