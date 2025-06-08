
# Star-Wars Encyclopedia 🌌


Le wiki convivial pour découvrir l'univers Star Wars, ainsi que pour partager sa passion avec la communauté de fans !

Ce Wiki avec forum de discussion est un projet visant à promouvoir la culture liée à l'univers Star Wars, ainsi qu'à satisfaire la soif de connaissance des fans de la dernière comme de la première heure sur cet univers de science-fiction iconique.

Je me présente, je suis Rafik Ben Sadi, développeur fullstack basé sur la région parisienne. J'ai eu le plaisir de concevoir ce projet dans le cadre de ma formation en 2024 de concepteur-développeur d'applications, et ce pour l'association fictive loi 1901:
"Amicale de la 501ème Légion" – 27, place de la Madeleine 75008 Paris, représenté par Jean-Michel Plagueis, son représentant légal (fictif aussi...).



1. Le site est dans un premier temps un wiki 📚:

Il met en place une interface responsive et conviviale pour rechercher, explorer ou même flâner en immersion dans cet univers, ses personnages, ses créatures, ses lieux iconiques et tout ce qui constitue ce magistral space-opera de légende. On y va pour apprendre, pour découvrir, pour se documenter ou pour approfondir ses connaissances.

Les données utilisées pour renseigner le wiki sont issues de l'API open source Star Wars Databank, un projet magistral d'Antonio Rosales que je remercie très chaleureusement. Antonio Rosales, alias lethamburn, est un passionné de Star Wars pur et dur, et la passion qu'il éprouve pour cet univers n'a d'égal que son talent pour le développement de ses projets Web.
Si vous désirez vous documenter sur Star Wars Databank, visitez ce lien : https://starwars-databank.vercel.app/
Si vous désirez visiter le profil Github d'Antonio Rosales, il est disponible ici : https://github.com/lethamburn

Les données du projet se devant d'être traduites dans un français impeccable, l'API de Deepl, l'un des meilleurs traducteurs au monde au moment où j'écris ces lignes, a été utilisée au sein de ce projet afin de répondre à cette exigence 🌐. Il s'agit d'un outil basé sur l'intelligence artificielle et qui utilise des données de contexte afin de générer des traductions les plus fiables et les plus respectueuses des spécificités du français actuel possibles. Il offre une bonne traduction du champ sémantique de Star Wars entre l'anglais et le français, ce qui est la raison principale de son choix. Suivez ce lien si vous désirez vous renseigner sur cet outil : https://www.deepl.com/fr/translator



2. Dans un second temps, Star Wars Encyclopedia est également un forum de discussion 💬:

C'était important à mon sens que les personnes souhaitant se documenter sur cet univers passionnant aient également un espace pour partager cette passion, et s'exprimer entre fans. C'est de ce raisonnement qu'est issu la création du forum de Star Wars Encyclopedia.

On peut s'y rendre pour s'y créer un compte personnalisé, puis participer aux discussions. On peut aussi bien en devenir un membre influent et actif que simplement s'y rendre pour y flâner de temps en temps. On peut y partager ses réflexions sur tout ce qui a trait à Star Wars : les films, les séries, les jeux vidéos... et même la littérature ! Tout les fans y sont les bienvenus, du moment que ce lieu reste propice à l'expression de la passion qui nous anime. 

Si vous pensez vraiment que Han n'a pas tiré le premier, créez une discussion et exposez vos arguments ! La communauté sera ravie de débattre et de partager son regard sur ce sujet. Bon, même si pour la plupart d'entre nous cette question est tranchée...

En tous les cas, tant que vous êtes authentique et désireux de communiquer votre passion pour Star Wars, je vous souhaite la bienvenue au forum de Star Wars Encyclopedia !

Portail de l'application : [www.star-wars-encyclopedia.com](https://www.star-wars-encyclopedia.com)



3. Une vidéothèque dédiée aux films et séries Star Wars 🎥:

La saga Star Wars est avant tout une saga cinématographique, et il m'est apparu intuitif d'intégrer sur cette plateforme une vidéothèque interactive permettant aux utilisateurs de parcourir les films et séries de l'univers Star Wars.

- Le menu latéral gauche affiche une liste déroulante des médias classés par date de sortie (films ou séries).
- En cliquant sur un titre, l'utilisateur peut accéder à une fiche complète : titre, résumé, date de sortie, bande-annonce en français (via YouTube), informations sur les créateurs et les acteurs.
- Un lien externe permet également d'accéder au film ou à la série sur Disney+.
- La vidéothèque est **responsive** et adaptée aux smartphones : le menu peut s'ouvrir et se fermer à l’aide d’un bouton ou d’un **mouvement de swipe** du doigt.
- En cas d'erreur (vidéo supprimée ou inaccessible), un message explicatif s’affiche à la place de la vidéo.

Cette fonctionnalité a été conçue pour offrir une expérience riche, immersive et pratique, que ce soit sur desktop ou mobile.



4. La boutique de Wattoo 🛒: un espace shopping immersif

Le projet propose également une fonctionnalité de boutique : la boutique de Wattoo. Cette section permet de découvrir et de simuler des achats d'artefacts inspirés de l'univers de Star Wars. On y trouve de tout : du sabre laser de Mace Windu au journal personnel de Padme Amidala, en passant par le carnet secret de Luthen Rael et le casque de Dark Revan.

Les artefacts sont classés par catégorie et peuvent être issus de l'univers Canon, Legends ou bien totalement originaux, créés à partir du lore de Star Wars.

Une page "Panier" 📋 permet de consulter les articles sélectionnés, leur quantité et le montant total.

Les paiements sont simulés grâce à Stripe, via son mode bac à sable intégré pour les tests.

Les transactions s'effectuent par carte 💳, et peuvent être testées avec les informations suivantes :

- Numéro de carte : 4242 4242 4242 4242
- Date d'expiration : toute date future (ex. 12/34)
- CVC : trois chiffres aléatoires (ex. 123)

Les produits sont actuellement chargés depuis un fichier JSON local 📂, mais une API REST est en cours de développement pour les gérer dynamiquement à terme. Le projet de cette API est accessible sur GitHub à cette adresse : [github.com/Rafikosaure/star-wars-artefacts-api](https://github.com/Rafikosaure/star-wars-artefacts-api)



5. Stack technique de base du projet 🛠️:
- frontend: React JS, SASS; 
- backend: Node JS, Express; 
- base de données: MongoDB; 
- ORM: Mongoose; 
- APIs frontend: Star Wars Databank, Deepl API, TMDB API; 
- Paiement: Stripe en mode bac à sable;
- Hébergement: https://vercel.com/
- Service d'emailing utilisé: Gmail



Si vous souhaitez me contacter au sujet de ce projet ou d'autre chose, envoyez-moi un email à "rafikbensadi@live.fr". Je vous répondrai sans délai.

Je vous souhaites une excellente immersion dans Star Wars Encyclopedia !!!
