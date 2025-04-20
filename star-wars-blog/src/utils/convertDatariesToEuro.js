
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