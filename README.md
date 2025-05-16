# TP Rhum Node.js

## Prérequis :

Avant d'utiliser ce projet Node.js, assurez-vous d'avoir les éléments suivants installés ou accessibles : : 
    - Une URI MongoDB valide, pointant vers une base de données contenant au moins une collection de rhums
    - MongoDB Database Tools (CLI) : https://www.mongodb.com/docs/v7.0/installation/
    - Avoir installer MongoDB Command Line Database Tools : https://www.mongodb.com/try/download/database-tools
    - Bruno (alternative à Postman) pour tester les requêtes API : https://www.usebruno.com/
    - Avoir installer Node.js : https://nodejs.org/fr



## 1. Installation de la base de données :

Commencez par cloner la base de données MongoDB à l’aide de la commande suivante :

        mongorestore --uri="[uri_de_votre_base]" --db=rhums dump/rhums


## 2. Lancer MongoDB en local

Pour utiliser MongoDB en local, vous devez démarrer le serveur MongoDB avec le chemin vers le répertoire de base de données :

        mongod --dbpath ./db


## 3. Installation et démarrage du projet Node.js

### 3.1 Installer les dépendances

Dans le répertoire du projet, exécutez la commande suivante pour installer toutes les dépendances nécessaires :

        npm install


### 3.2 Configurer les variables d’environnement

Créez un fichier .env à la racine du projet en vous basant sur le fichier .env.example. Vous devrez notamment y renseigner l'uri de votre BDD, un token et les types de logs (server et database) que vous souhaitez afficher.

### 3.3 Lancer le serveur

Une fois tout configuré, lancez simplement le serveur avec :

        npm start


## 4. Structure de l’API

POST    /user/login             Se connecter
POST    /user/register          Créer un nouveau compte  

GET	    /rhums	                Liste tous les rhums
GET	    /rhums/search	        Filtrer les rhums en fonction de leur caractéristiques

GET	    /ingredient	            Liste tous les ingredients
GET	    /ingredient/search	    Filtrer les ingredient en fonction de leur caractéristiques
POST    /ingredient/add 	    Ajouter un nouvel ingrédient
    
GET	    /recette/getPublic	    Liste toutes les recettes publiques
GET	    /recette/getPrivate	    Liste toutes les recettes privée de l'utilisateur courrant
POST    /recette/add 	        Ajouter une nouvelle recette (publique ou privée)
PUT     /recette/update/:id 	Modifier une recette






Pour avoir plus d'informations sur les caractéristiques des différents models (rhum, ingrédient,...), 
dirigez vous vers le dossier : TP-Rhum\src\model

Des exemples d'utilisations sont disponibles dans TP-Rhum\test\api\bruno


## 5. Amélioration potentielles

La couche controller n'a pour l'instant été faite que pour les routes user et la route principale de rhum 
