
# Star-Wars Encyclopedia


Le wiki convivial pour découvrir l'univers Star Wars, ainsi que pour partager sa passion avec la communauté de fans !

Ce Wiki avec forum de discussion est un projet visant à promouvoir la culture liée à l'univers Star Wars, ainsi qu'à satisfaire la soif de connaissance des fans de la dernière comme de la première heure sur cet univers de science-fiction iconique.

Il a été conçu par Rafik Ben Sadi à l'occasion de sa formation en 2024 de concepteur-développeur d'applications. Rafik est basé sur la région parisienne et a conçu ce projet pour l'association fictive loi 1901:
"Amicale de la 501ème Légion" – 27, place de la Madeleine 75008 Paris, représenté par Michel Plagueis, son représentant légal (fictif aussi...).



1. Le site est dans un premier temps un wiki :

Il met en place une interface responsive et conviviale pour rechercher, explorer ou même flâner en immersion dans cet univers, ses personnages, ses créatures, ses lieux iconiques et tout ce qui constitue ce magistral space-opera de légende. On y va pour apprendre, pour découvrir, pour se documenter ou pour approfondir ses connaissances.

Les données utilisées pour renseigner le wiki sont issues de l'API open source Star Wars Databank, un projet magistral d'Antonio Rosales que je remercie très chaleureusement. Antonio Rosales, alias lethamburn, est un passionné de Star Wars pur et dur, et la passion qu'il éprouve pour cet univers n'a d'égal que son talent pour le développement de ses projets Web.
Si vous désirez vous documenter sur Star Wars Databank, visitez ce lien : https://starwars-databank.vercel.app/
Si vous désirez visiter le profil Github d'Antonio Rosales, il est disponible ici : https://github.com/lethamburn

Les données du projet se devant d'être traduites dans un français impeccable, l'API de Deepl, l'un des meilleurs traducteurs au monde à l'heure actuel, a été utilisée au sein de ce projet afin de répondre à cette exigence. Il s'agit d'un outil basé sur l'intelligence artificielle et qui utilise des données de contexte afin de générer des traductions les plus fiables et les plus respectueuses des spécificités du français actuel possibles. Il offre une bonne traduction du champ sémantique de Star Wars de l'anglais vers le français, ce qui est la raison principale de son choix. Suivez ce lien si vous désirez vous renseigner sur cet outil : https://www.deepl.com/fr/translator



2. Dans un second temps, Star Wars Encyclopedia est également un forum de discussion :

C'était important à mon sens que les personnes souhaitant se documenter sur cet univers passionnant aient également un espace pour partager cette passion, et s'exprimer entre fans. C'est de ce raisonnement qu'est issu la création du forum de Star Wars Encyclopedia.

On peut s'y rendre pour s'y créer un compte personnalisé, puis participer aux discussions. On peut aussi bien en devenir un membre influent et actif que simplement s'y rendre pour y flâner de temps en temps. On peut y partager ses réflexions sur tout ce qui a trait à Star Wars : les films, les séries, les jeux vidéos, et même la littérature ! Tout les fans y sont les bienvenus, du moment que ce lieu reste propice à l'expression de la passion qui nous anime. 

Si vous pensez vraiment que Han n'a pas tiré le premier, créez une discussion et exposez vos arguments ! La communauté sera ravie de débattre et de partager son regard sur ce sujet. Bon, même si pour la plupart d'entre nous cette question est tranchée...

En tous les cas, tant que vous êtes authentique et désireux de communiquer votre passion pour Star Wars, je vous souhaite la bienvenue au forum de Star Wars Encyclopedia !



3. Stack technique de base du projet :
- frontend: React JS, SASS; 
- backend: Node JS, Express; 
- base de données: MongoDB; 
- ORM: Mongoose; 
- APIs frontend: Star Wars Databank, Deepl API; 
- Hébergement: https://vercel.com/
- Service d'emailing utilisé: Gmail


4. Démarrage du projet :

Ceci est à l'attention des personnes souhaitant clôner ce projet. Attention ! Avant toute chose, ce projet ne démarrera pas sans la configuration des variables d'environnement; Un descriptif détaillé de ces variables est disponible en fin de ce readme.

Pour que ce projet démarre, et si vous avez configuré les variables d'environnement, il est nécessaire de fournir les dépendances nécessaires au projet, c'est le bagage logiciel dont il se sert pour fonctionner.

Commencez par installer les dépendances côté serveur :
- ouvrez un terminal à la racine du projet, puis déplacez-vous dans le répertoire du backend avec la commande : "cd star-wars-backend";
- ensuite lancez l'installation des dépendances : "npm install";
Ensuite faites la même chose mais côté client :
- retournez à la racine du projet avec : "cd ..";
- ensuite entrez dans le répertoire adéquat : "cd star-wars-blog";
- enfin, installez les dépendances avec : "npm install".

Une fois que ceci est fait, il ne reste plus qu'à lancer l'application côté backend d'abord, puis côté frontend, et toujours dans cet ordre. Procédez ainsi :
- lancer l'application backend : rendez-vous de nouveau dans le bon dossier avec la commande "cd .." puis "cd star-wars-backend";
- ensuite, lancez le serveur nodejs avec cette commande "nodemon server.js";
Si vous rencontrez un bug, il vous faut configurer votre connexion à la base de données MongoDB : utilisez vos propres identifiants de connexion avec votre cluster MongoDB et insérez-les dans un fichier nommé ".env" dans le dossier "star-wars-backend". Un descriptif des variables d'environnement à configurer est disponible en fin de ce readme.
- puis, au tour de l'application frontend : revenez à la racine du projet avec la commande "cd .." et entrez dans le frontend avec "cd star-wars-blog"; De nouveau, si vous avez configuré correctement les variables d'environnement, tout se passera correctement.
- enfin, démarrez l'application côté frontend avec "npm start".

Une fois le backend et le frontend lançés, ils communiquent ensemble et le projet fonctionne de manière globale.


5. Variables d'environnement, descriptif :

FRONTEND:
- REACT_APP_DEEPL_API_KEY = [mettez votre clé d'API Deepl]
- REACT_APP_EXPRESS_SERVER_ENDPOINT = [c'est l'adresse de votre serveur local, port compris. Par exemple : "http://localhost:8000"]
- REACT_APP_STAR_WARS_DATABANK_API =[l'URL de départ de toutes vos requêtes à l'API de Star Wars Databank]

BACKEND:
- MONGODB_USER = [nom d'utilisateur de la base MongoDB]
- MONGODB_PASSWORD = [mot de passe de votre base MongoDB]
- TOKEN = [jeton secret, doit être le plus complexe possible. Vous pouvez le générer avec un outil en ligne]
- API_KEY = [clé API de votre service Deepl]
- NB_HASH = [le "salt" de votre hashage]
- CORS_ORIGIN = [URL à autoriser dans les CORS]
- EMAIL_SENDER_ADDRESS = [adresse email de l'expéditeur de vos notifications]
- SENDER_NAME = [nom de l'expéditeur de vos notifications mail]
- GMAIL_APP_PASSWORD = [clé Gmail: obligatoire pour utiliser le service d'emailing de Gmail]
- EMAIL_HOST = [le nom du service mis à disposition par Gmail]
- EMAIL_PORT = [le port d'expédition des emails]
- SERVER_PORT = [port de votre serveur Express]
- CLIENT_PORT = [port de votre client React]



Si vous souhaitez me contacter au sujet de ce projet ou d'autre chose, envoyez-moi un email à "rafikbensadi@live.fr". Je vous répondrai sans délai.

Je vous souhaites une excellente immersion dans Star Wars Encyclopedia !!!
