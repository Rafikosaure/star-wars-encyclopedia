# Utilise l'image officielle
FROM node:alpine

# Définit le répertoire de travail dans le conteneur
# On l'écrit souvent avec ces deux syntaxes : "/usr/src/app" ou "/www"
WORKDIR /www

# Copie package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copie le reste des fichiers
COPY . .

# Expose le port
EXPOSE 3000

# Démarrer l'application
CMD [ "npm", "start" ]