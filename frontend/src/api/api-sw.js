import config from "../config"


// Appels centralisés vers l'API StarWars Databank
export const StarWarsApiServices = {

    // Récupération des articles d'une catégorie
    getArticlesByCategory: (category) => {
        return fetch(`${config.starWarsAPI}/${category}?page=1&limit=all`)
        .then(response => response.json())
        .then(articles => articles.data)
        .catch(error => {
            console.log(error);
            throw error;
        });
    },

    // Récupération d'un article par catégorie & identifiant    
    async fetchStarWarsArticle(keyword, articleId) {
        try {
            const response = await fetch(`${config.starWarsAPI}/${keyword}/${articleId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error; // On relance l'erreur pour la gérer ailleurs si nécessaire
        }
    },

    // Récupérer les articles d'une catégorie dans une page donnée
    async fetchStarWarsCategoryData(keyword, storedDozen) {
        try {
            const response = await fetch(`${config.starWarsAPI}/${keyword}?page=${storedDozen}`);
            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}