import config from '../config'

// SWITCH DES DONNEES DU SHOPPING :
// const localOrigin = true -> données locales
// const localOrigin = false -> données de l'API
const localOrigin = true;


// Appels centralisés vers le serveur Node.JS du projet
export const ShoppingServices = {

    // Récupérer les produits de l'API (boutique)
    async getProductsToSell() {
        if (localOrigin) {
            const shoppingData = await import('../data/shoppingData.json')
            return shoppingData.default;
        } else {
            try {
                const productsArray = await fetch(`${config.starWarsShoppingApi}/products`);
                return productsArray.json()
            } catch(error) {
                console.log(error)
                return []
            }
        }
    }
};
