import { toast } from 'sonner'
import config from '../config'


// Appels centralisés vers le serveur Node.JS du projet
export const ServerServices = {

    // Fonction de connexion au site
    async loginUser(data, dispatch, updateIsLoggedUser, navigate) {
        try {
        const response = await fetch(`${config.serverEndpoint}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const result = await response.json();

        if (result.message) {
            toast("Identifiants incorrects !");
            dispatch(updateIsLoggedUser(false));
        } else {
            sessionStorage.setItem("connect", config.persistentConnect);
            dispatch(updateIsLoggedUser(true));
            navigate("/");
            toast("Vous êtes connecté !");
        }

        return result; // Retourne la réponse pour un éventuel traitement supplémentaire

        } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        dispatch(updateIsLoggedUser(false));
        throw error; // Permet de gérer l'erreur côté appelant
        }
    },

    // Fonction d'inscription au site
    async registerUser(data, dispatch, updateRegisterState, setUnvalidPassword, reset, validatePassword) {
        try {
            const isValid = validatePassword(data.password);
            if (!isValid) {
                toast("Mot de passe trop faible !");
                setUnvalidPassword("block");
                return;
            }

            const formData = new FormData();
            if (data.picture?.length > 0) {
                formData.append("picture", data.picture[0]);
                delete data.picture;
            } else {
                delete data.picture;
            }
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);

            const response = await fetch(`${config.serverEndpoint}/auth/register`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const result = await response.json();
            setUnvalidPassword("none");
            dispatch(updateRegisterState(false));
            toast("Compte utilisateur créé !");
            reset();

            return result;

        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            throw error;
        }
    },

    // Traduction linguistique automatique du sujet traité
    async translateText(sourceLang, targetLang, text) {
        try {
            const response = await fetch(`${config.serverEndpoint}/translate`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ sourceLang, targetLang, name: text })
            });
        
            const result = await response.json();
            return result.name.text.replace(/^"|"$/g, ""); // Nettoyage des guillemets inutiles
        } catch (error) {
            console.error("Erreur de traduction :", error);
            return null;
        }
    },

    // Fonction pour récupérer un commentaire par son ID
    async getCommentById(commentId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/comment/getOneComment/${commentId}`);
            const result = await response.json();
            if (result.message) {
                throw new Error(result.message);
            }
            return result;
        } catch (error) {
            console.error("Erreur lors de la récupération du commentaire :", error);
            return null;
        }
    },

    // Fonction pour récupérer l'auteur d'un commentaire
    async getCommentAuthor(authorId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/comment/getCommentAuthor/${authorId}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'auteur :", error);
            return null;
        }
    },

    // Fonction pour supprimer un commentaire
    async deleteComment(commentId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/comment/deleteAComment/${commentId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
            return null;
        }
    },

    // Fonction pour modifier le commentaire
    async modifyComment(commentId, newContent) {
        try {
            const response = await fetch(`${config.serverEndpoint}/comment/updateAComment/${commentId}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(
                    { content: newContent }
                ),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Erreur lors de la modification du commentaire :", error);
            return null;
        }
    },

    // Fonction pour créer un commentaire via une requête au serveur
    async createCommentRequest(postId, fetchData) {
        try {
            const response = await fetch(`${config.serverEndpoint}/comment/createComment/${postId}`, {
                method: "POST",
                credentials: "include",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(fetchData)
            });
        
            // Vérification de la réponse du serveur
            if (!response.ok) {
                throw new Error('Erreur lors de la création du commentaire');
            }
        
            // Conversion de la réponse en JSON
            const result = await response.json();
            return result;
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur de requête:', error);
            throw error; // On lance l'erreur pour qu'elle puisse être capturée dans l'appel
        }
    },

    // Fonction pour mettre à jour l'état du suivi du sujet dans une discussion
    async updateFollowStatus(topicId, toFollow) {
        try {
            const response = await fetch(`${config.serverEndpoint}/followTopic/chooseWhetherToFollowOrNot/${topicId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ toFollow })
            });

            // Vérification de la réponse
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du suivi du sujet');
            }

            return
        } catch (error) {
            console.error('Erreur de requête:', error);
            throw error; // Propagation de l'erreur pour qu'elle soit gérée ailleurs
        }
    },

    async checkUserConnection() {
        try {
            const response = await fetch(`${config.serverEndpoint}/auth/logged`, {
                credentials: "include"
            });
    
            // Vérification de la réponse du serveur
            if (!response.ok) {
                throw new Error('Erreur de connexion');
            }
    
            const data = await response.json();
            return data; // Retour des données utilisateurs si la requête est réussie
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur de requête:', error);
            throw error; // On relance l'erreur pour qu'elle soit capturée au niveau du composant
        }
    },

    // Fonction pour déconnecter un utilisateur
    async logoutRequest() {
        try {
            const response = await fetch(`${config.serverEndpoint}/auth/logout`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la déconnexion");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur de requête :", error);
            throw error;
        }
    },

    // Récupération du tableau de likes du post / du commentaire courant
    async getLikes(typeId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/like/getLikes/${typeId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Accept": "application/json" }
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des likes');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur de requête:', error);
            throw error;
        }
    },

    // Liker un post / un commentaire
    async attributeLike(typeId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/like/attributeLike/${typeId}`, {
                method: "POST",
                credentials: "include",
                headers: { "Accept": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de l’attribution du like');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Erreur de requête:', error);
            throw error;
        }
    },

    // "Disliker" un post / un commentaire
    async dislike(likeId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/like/dislike/${likeId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Accept": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors du dislike');
            }
        } catch (error) {
            console.error('Erreur de requête:', error);
            throw error;
        }
    },
};
