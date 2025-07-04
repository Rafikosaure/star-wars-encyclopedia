import config from '../config'


// Appels centralisés vers l'API des artefacts Star Wars
export const ShoppingServices = {

    // Récupérer les produits de l'API (boutique)
    async getProductsToSell() {
        try {
            const productsArray = await fetch(`${config.starWarsShoppingApi}?limit=all`);
            return productsArray.json()
        } catch(error) {
            console.log(error)
            return []
        }
    }
};
