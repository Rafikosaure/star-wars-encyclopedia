// FONCTIONS DU STORE REDUX D'E-COMMERCE


// Fonction pour charger le panier depuis localStorage
// (juste les ids et quantités)
export function loadBasketFromLocalStorage() {
    try {
        const serializedBasket = localStorage.getItem('basket');
        if (serializedBasket === null) {
            return [];
        }
        const parsed = JSON.parse(serializedBasket);
        // On vérifie que chaque élément a bien un id et une quantité
        if (Array.isArray(parsed) && parsed.every(p => 'id' in p && 'quantity' in p)) {
            return parsed;
        }
        return [];
    } catch (e) {
        console.warn("Erreur lors du chargement du panier", e);
        return [];
    }
}


// Fonction pour sauvegarder le panier dans localStorage
export function saveBasketToLocalStorage(basketItems) {
    try {
        const serializedBasket = JSON.stringify(basketItems);
        localStorage.setItem('basket', serializedBasket);
    } catch (e) {
        console.warn("Erreur lors de la sauvegarde du panier", e);
    }
}


// Fonction pour supprimer le panier du localStorage
export function clearBasketFromLocalStorage() {
    try {
        localStorage.removeItem('basket');
    } catch (e) {
        console.warn("Erreur lors de la suppression du panier", e);
    }
}