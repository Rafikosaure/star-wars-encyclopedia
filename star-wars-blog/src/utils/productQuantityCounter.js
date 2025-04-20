
// Compteur d'occurrence du produit courant dans le panier
export const productQuantityCounter = (basketContent, currentProduct) => {

    const currentCount = basketContent.reduce((acc, item) => 
        item.id === currentProduct.id ? acc + 1 : acc, 0)

    // Si le produit est en rupture de stock, on ne l'ajoute pas
    if (currentCount >= currentProduct.maxQuantity) {
        return true
    }
    return false
}