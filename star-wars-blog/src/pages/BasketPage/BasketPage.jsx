import './BasketPage.scss'
import '../../sharedStyles/index.scss'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import React from 'react'
import { selectBasket } from '../../redux/slices/shoppingBasket'
import { useSelector } from 'react-redux'
import BasketCard from '../../components/BasketCard/BasketCard'


function BasketPage() {

    const basketContent = useSelector(selectBasket)

    // Regrouper les articles par ID avec leur quantité
    const groupedBasketMap = basketContent.reduce((acc, product) => {
        if (acc[product.id]) {
            acc[product.id].quantity += 1
        } else {
            acc[product.id] = { ...product, quantity: 1 }
        }
        return acc
    }, {})
    const groupedBasket = Object.values(groupedBasketMap)
    console.log('Produits :', groupedBasket)


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
                        <p className='basket-page-full-text'>Votre panier contient {basketContent.length} articles</p>

                        <div className='basket-page-full-content'>
                            {groupedBasket.map((product, index) => (
                                <BasketCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default BasketPage
