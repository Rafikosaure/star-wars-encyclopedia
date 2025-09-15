import config from "../config"


// Appels centralisés vers l'API StarWars Databank
export const TmdbApiServices = {

    // Récupération d'un article par catégorie & identifiant    
    async fetchStarWarsMovies(pageNumber, listTypeId) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${config.tmdbApiKey}`
                }
            };
            const response = await fetch(`${config.tmdbApiEndpoint}/3/list/${listTypeId}?language=fr-FR&page=${pageNumber}`, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error; // On relance l'erreur pour la gérer ailleurs si nécessaire
        }
    }
}