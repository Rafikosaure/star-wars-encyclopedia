import { toast } from 'sonner'
import config from '../config'
import { validatePassword } from '../utils/passwordValidationFunctions';


// Appels centralisés vers le serveur Node.JS du projet
export const ServerServices = {

    // Connexion au site
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

    // Inscription au site
    async registerUser(data, dispatch, updateRegisterState, setUnvalidPassword, reset, setValue) {
        try {
            const isValid = validatePassword(data.password);
            if (!isValid) {
                toast("Mot de passe trop faible !");
                setUnvalidPassword("block");
                setValue('password', undefined)
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

        } catch(error) {
            console.error("Erreur lors de l'inscription :", error);
            throw error;
        }
    },

    // Traduction linguistique automatique du sujet traité
    async translateText(sourceLang, targetLang, name, description) {
        try {
            let object = {
                sourceLang: sourceLang,
                targetLang: targetLang,
                name: name
            }
            if (description) {
                object.description = description
            }
            const response = await fetch(`${config.serverEndpoint}/translate`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            });
            const result = await response.json();
            if (description) {
                return {
                    name: result.name.text.replace(/^"|"$/g, ""),
                    description: result.description.text.replace(/^"|"$/g, "")
                }
            }
            return result.name.text.replace(/^"|"$/g, ""); // Nettoyage des guillemets inutiles
        } catch (error) {
            console.error("Erreur de traduction :", error);
            return null;
        }
    },

    // Récupérer un commentaire par son ID
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

    // Récupérer l'auteur d'un commentaire
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

    // Supprimer un commentaire
    async deleteCommentRequest(commentId) {
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

    // Modifier un commentaire
    async modifyCommentRequest(commentId, newContent) {
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

    // Créer un commentaire
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

    // Mettre à jour l'état du suivi du sujet dans une discussion
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

    // Vérifier si l'utilisateur est connecté
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
            console.error('Erreur de requête:', error);
            throw error; // On relance l'erreur pour qu'elle soit capturée au niveau du composant
        }
    },

    // Déconnexion de l'utilisateur
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

    // Récupération des likes du post / du commentaire via son identifiant
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

    // Disliker un post / un commentaire
    async dislikeRequest(likeId) {
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

    // Modifier les données d'un utilisateur
    async updateUserData(userId, data) {
        if (data.password.length > 0) {
            const isValid = validatePassword(data.password);
            if (!isValid) {
                return 'Mot de passe trop faible !'
            }
        }

        const formData = new FormData();
        if (data.picture && data.picture.length > 0) {
            formData.append('picture', data.picture[0]);
            delete data.picture;
        } else {
            delete data.picture;
        }

        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        const response = await fetch(`${config.serverEndpoint}/user/update/${userId}`, {
            method: "PUT",
            body: formData,
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    },

    // Récupérer les options de notification de l'utilisateur
    async getUserMentionOption(userId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/isMentionned/getIsMentionnedOption/${userId}`, {
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des préférences de mention.");
            }

            const data = await response.json();
            return data.allowMentions;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Autorise ou interdit les notifications en cas de mention
    async updateMentionOption(userId, newOption) {
        try {
            const response = await fetch(`${config.serverEndpoint}/isMentionned/updateIsMentionnedOption/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({ mentionOption: newOption }),
                credentials: "include",
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de l'option de mention.");
            }
    
            const data = await response.json();
            return data.newOption;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Récupérer l'auteur d'un post
    async getPostAuthor(postAuthorId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/post/getPostAuthor/${postAuthorId}`);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération de l'auteur du post");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Supprimer un post via son identifiant
    async deletePostById(postId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/post/deletePostById/${postId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du post");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Modifier le contenu d'un post
    async updatePostContent(postId, newContent) {
        const response = await fetch(`${config.serverEndpoint}/post/updatePost/${postId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ content: newContent })
        });
        return response.json();
    },

    // Récupérer tous les utilisateurs du site
    async getAllUsers() {
        return fetch(`${config.serverEndpoint}/user/getAll`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            throw error; // On lance l'erreur si elle se produit
        });
    },

    // Récupérer les abonnés d'une discussion
    async getTopicFollowers(topicId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/followTopic/getAllFollowersOfATopic/${topicId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    // Supprimer une discussion
    async deleteTopicById(topicId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/topic/deleteTopicById/${topicId}`, {
                method: "DELETE",
                credentials: "include"
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Suivre / ne plus suivre une discussion
    async toggleFollowTopic(topicId, toFollow) {
        try {
            const response = await fetch(`${config.serverEndpoint}/followTopic/chooseWhetherToFollowOrNot/${topicId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ toFollow })
            });

            return await response.json();
        } catch (error) {
            console.error("Erreur lors du suivi de la discussion :", error);
            throw error;
        }
    },

    // Créer une discussion
    async createTopicRequest(fetchData, topicsCategoryId) {
        return fetch(`${config.serverEndpoint}/topic/createTopic/${topicsCategoryId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error)
            throw error;
        });
    },

    // Supprimer un utilisateur par son identifiant
    async deleteUserById(userId) {
        return fetch(`${config.serverEndpoint}/user/authDeleteById/${userId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => response.json())
    },

    // Récupérer les discussions d'un utilisateur
    async getFollowedTopics(userId) {
        return fetch(`${config.serverEndpoint}/followTopic/getAllFollowedTopics/${userId}`)
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            throw new Error("Failed to fetch followed topics");
        });
    }, 

    // Suppression de son propre compte utilisateur
    async deleteHisOwnUserAccount() {
        return fetch(`${config.serverEndpoint}/user/deleteById`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            throw error; // On renvoie l'erreur pour la gestion dans le composant
        });
    },

    // Récupérer toutes les catégories du Forum
    async fetchForumCategories() {
        try {
            const response = await fetch(`${config.serverEndpoint}/category/getCategories`);
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    // Récupérer les posts d'une discussion
    async getTopicPosts(topicId, currentPage) {
        if (topicId && currentPage) {
            const response = await fetch(`${config.serverEndpoint}/post/getPostsByTopicId/${topicId}/posts?page=${currentPage}`);
            return response.json();
        }
    },

    // Récupérer la catégorie d'une discussion
    async fetchCategoryFromTopic(topicId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/category/findCategoryFromTopic/${topicId}`);
            const data = await response.json();
            return data.category[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    // Créer un post
    async postNewPost(topicId, fetchData) {
        const response = await fetch(`${config.serverEndpoint}/post/createPost/${topicId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(fetchData)
        });
        return response.json();
    },

    // Récupérer les discussions par identifiant de catégorie
    async getTopicsByCategoryId(topicsCategoryId) {
        try {
            const response = await fetch(`${config.serverEndpoint}/topic/getTopicsByCategory/${topicsCategoryId}`);
            return response.json()
        } catch(error) {
            console.log(error);
            return null;
        }
    }
};