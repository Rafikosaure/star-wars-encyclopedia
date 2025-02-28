const { exec } = require('child_process');
const ENV = require('../config/config.js')



// Créer une catégorie de topics
exports.backendDeployWebhook = (req, res) => {
    let isDeploymentLocked = false;

    if (isDeploymentLocked) {
        return res.status(503).send('Déploiement en cours, veuillez réessayer plus tard.');
    }

    const event = req.headers['x-github-event'];

    // Gestion de l'événement "push"
    if (event === 'push') {
        const payload = req.body;

        // Vérification de la branche (optionnel, ici on vérifie si c'est la branche 'main')
        if (payload.ref === 'refs/heads/main') {
            let isBackendPush = false;

            // Vérifier si un fichier dans le dossier 'star-wars-backend' a été modifié
            payload.commits.forEach(commit => {
                commit.added.forEach(file => {
                    if (file.startsWith('star-wars-backend/')) {
                        isBackendPush = true;
                    }
                });
                commit.modified.forEach(file => {
                    if (file.startsWith('star-wars-backend/')) {
                        isBackendPush = true;
                    }
                });
                commit.removed.forEach(file => {
                    if (file.startsWith('star-wars-backend/')) {
                        isBackendPush = true;
                    }
                });
            });

            if (!isBackendPush) {
                return res.status(400).send('Le push ne concerne pas le dossier backend.');
            }

            console.log(`[${new Date().toISOString()}] Déploiement en cours...`);

            isDeploymentLocked = true;  // Verrouillage du déploiement

            // Arrêt de l'application en cours
            exec(`pkill -f "node ${ENV.HOST_PATH_TO_APP}/app.js"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'arrêt de l'application: ${error}`);
                    isDeploymentLocked = false;
                    return res.status(500).send('Erreur lors de l\'arrêt de l\'application.');
                }

                // Mise à jour du code (git pull) et redémarrage
                exec(`cd ${ENV.HOST_PATH_TO_APP} && git pull && npm install && node app.js`, (error, stdout, stderr) => {
                    isDeploymentLocked = false;  // Déverrouillage du déploiement après le redémarrage

                    if (error) {
                        console.error(`Erreur lors du démarrage de l'application: ${error}`);
                        return res.status(500).send('Erreur lors du démarrage de l\'application.');
                    }

                    console.log(`[${new Date().toISOString()}] Application mise à jour et redémarrée avec succès !`);
                    res.status(200).send('Déploiement effectué avec succès.');
                });
            });
        } else {
            res.status(400).send('Webhook reçu, mais ce n\'est pas un push sur la branche principale.');
        }
    }
    // Gestion de l'événement "pull_request"
    else if (event === 'pull_request') {
        const payload = req.body;
        
        // Vérifier si la pull request est fermée ou synchronisée (pour les mises à jour)
        if (payload.action === 'opened' || payload.action === 'synchronize' || payload.action === 'reopened') {
            // Vérifier si la source de la PR concerne bien le backend
            let isBackendPush = false;

            payload.pull_request.changed_files.forEach(file => {
                if (file.filename.startsWith('star-wars-backend/')) {
                    isBackendPush = true;
                }
            });

            if (!isBackendPush) {
                return res.status(400).send('La pull request ne concerne pas le dossier backend.');
            }

            console.log(`[${new Date().toISOString()}] Déploiement en cours pour une pull request...`);

            isDeploymentLocked = true;  // Verrouillage du déploiement

            // Arrêt de l'application en cours
            exec(`pkill -f "node ${ENV.HOST_PATH_TO_APP}/app.js"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'arrêt de l'application: ${error}`);
                    isDeploymentLocked = false;
                    return res.status(500).send('Erreur lors de l\'arrêt de l\'application.');
                }

                // Mise à jour du code (git pull) et redémarrage
                exec(`cd ${ENV.HOST_PATH_TO_APP} && git pull && npm install && node app.js`, (error, stdout, stderr) => {
                    isDeploymentLocked = false;  // Déverrouillage du déploiement après le redémarrage

                    if (error) {
                        console.error(`Erreur lors du démarrage de l'application: ${error}`);
                        return res.status(500).send('Erreur lors du démarrage de l\'application.');
                    }

                    console.log(`[${new Date().toISOString()}] Application mise à jour et redémarrée avec succès !`);
                    res.status(200).send('Déploiement effectué avec succès.');
                });
            });
        } else {
            res.status(400).send('La pull request n\'est ni ouverte, ni synchronisée.');
        }
    } else {
        res.status(400).send('Événement GitHub non pris en charge.');
    }
}