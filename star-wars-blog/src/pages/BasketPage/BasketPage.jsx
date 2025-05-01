import './BasketPage.scss'
import '../../sharedStyles/index.scss'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import React, { useEffect, useState } from 'react'
import { 
    selectProducts,
    selectProductsStatus,
    fetchProducts 
} from '../../redux/slices/productsSlice.js'
import { selectBasket } from '../../redux/slices/shoppingBasket'
import { useSelector, useDispatch } from 'react-redux'
import BasketCard from '../../components/BasketCard/BasketCard'
import { 
    convertDatariesToEuro,
    mergeBasketWithCatalog,
    basketTotalProductsCalc,
    eurosToPay  
} from '../../utils/shoppingUtils.js'



function BasketPage() {

    const rawBasket = useSelector(selectBasket)
    const storedProducts = useSelector(selectProducts)
    const productsStatus = useSelector(selectProductsStatus)
    const dispatch = useDispatch()
    const [basketContent, setBasketContent] = useState([])

    // Calculer le nombre total de produits dans le panier
    const totalBasketProducts = basketTotalProductsCalc(basketContent)


    // Récupération des données de l'API
    useEffect(() => {
        if (productsStatus === 'idle') {
          dispatch(fetchProducts());
        }
    }, [dispatch, productsStatus]);



    // Reconstitution des données des produits depuis leur id
    useEffect(() => {
        if (storedProducts && storedProducts.length > 0) {
            setBasketContent(mergeBasketWithCatalog(rawBasket, storedProducts));
        }
    }, [storedProducts, rawBasket])


    // Calcul du coût total en euros
    const totalEuros = convertDatariesToEuro(eurosToPay(basketContent))


    // Gestion de l'affichage asynchrone
    if (productsStatus === 'loading') return <p>Chargement...</p>;
    if (productsStatus === 'failed') return <p>Erreur lors du chargement.</p>;


    return (
        <div className='app basket-page-wrapper'>
            <div className='basket-page-maintenance'>Service de shopping expérimental : achats simulés</div>
            <div className='basket-page-background' />
            <h1 className='basket-page-title'>Panier</h1>
            <div className='basket-page-return-arrow-wrapper'>
                <div 
                className='basket-page-return-arrow' 
                tabIndex="0" 
                onClick={() => window.history.back()}
                onKeyDown={(e) => e.key === 'Enter' && window.history.back()}
                title='Retourner à la page précédente'
                >
                    <img src={ReturnArrow}  alt="retour" className='basket-page-return-arrow-image' />
                </div>
            </div>
            
            <section className='basket-page-content'>
                {basketContent.length === 0 ? (
                    <div className='basket-page-empty'>
                        <p className='basket-page-empty-text'>Votre panier est vide</p>
                    </div>
                ) : (
                    <div className='basket-page-full'>
                        <p className='basket-page-full-text'>Votre panier contient {totalBasketProducts} {totalBasketProducts > 1 ? 'produits' : 'produit'}</p>

                        <div className='basket-page-full-content'>
                            {basketContent.map((product) => (
                                <BasketCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
            {basketContent.length > 0 && (
                <section className='basket-page-total'>
                    <div className='basket-page-total-content'>
                        <p className='basket-page-total-text'>Total : {totalEuros}</p>
                    </div>
                    <div className='basket-page-total-legal'>
                        <p className='basket-page-total-legal-text'>En cliquant sur "Valider la commande", vous acceptez nos <a className='basket-page-total-legal-text-link' href="/legal#CGV">conditions générales de vente</a>.</p>
                    </div>
                    <div className='basket-page-total-button-wrapper'>
                        <button className='basket-page-total-button'>Valider la commande</button>
                    </div>
                </section>
            )}
        </div>
    )
}

export default BasketPage
