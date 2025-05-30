// FONCTIONS UTILITAIRES DU SERVICE E-COMMERCE


// Formate les données issues de l'API
export async function formateApiData(shoppingData) {
    const activeData = await shoppingData.filter(item => item.isActive)
    const sortedData = await activeData.sort((a, b) => a.title.localeCompare(b.title));
    return await sortedData
}


// Vérifie si un produit a atteint sa quantité maximale dans le panier
export const productQuantityCounter = (basketContent, currentProduct) => {

    const basketItem = basketContent.find(item => item.id === currentProduct.id);
    const currentCount = basketItem ? basketItem.quantity : 0;
    return currentProduct.maxQuantity && currentCount >= currentProduct.maxQuantity;
};


// Gère les données extraites du panier (slice Redux)
export function mergeBasketWithCatalog(rawBasket, productsArray) {
    if (!Array.isArray(rawBasket) || !Array.isArray(productsArray)) return [];
    
    return rawBasket
        .map(item => {
            const product = productsArray.find(p => p.id === item.id);
            if (!product) return null; // Produit supprimé ou non trouvé
            return {
                ...product,
                quantity: item.quantity
            };
        })
        .filter(Boolean); // Supprime les éventuels "null"
}


// Regrouper les produits par ID avec leur quantité
export function groupedBasketMap(basketContent) {

    return Object.values(basketContent.reduce((acc, product) => {
        if (acc[product.id]) {
            acc[product.id].quantity += 1
        } else {
            acc[product.id] = { ...product, quantity: 1 }
        }
        return acc
    }, {}))
}


function isSameProduct(a, b) {
    return a && b && a.id === b.id;
}

export function getProductCountInBasket(basketContent, currentProduct) {
    if (!Array.isArray(basketContent) || !currentProduct) return 0;

    const match = basketContent.find(item => isSameProduct(item, currentProduct));

    return match ? match.quantity : 0;
}


// Convertit un prix en dataries en euros
export const convertDatariesToEuro = (priceInDatariesString, rate = 0.12) => {
    // Nettoyer les espaces et convertir en float
    const dataries = parseFloat(priceInDatariesString.replace(/\s/g, ''));
    const euros = dataries * rate;
  
    // Format en euros, ex : "123,45 €"
    return euros.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// Calculer le nombre total de produits dans le panier
export const basketTotalProductsCalc = (basketContent) => {
    return basketContent.reduce(
        (acc, product) => 
            acc + product.quantity, 0
    )
}


// Calcul prix total en euros
export function eurosToPay(productsToPay) {
    return productsToPay.reduce((acc, product) => 
            acc + String(parseFloat(product.price.replaceAll(" ", '')
    )) * product.quantity, 0).toLocaleString('fr-FR')
}