import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BasketCard.scss'
import Currency from '../../assets/images/credit_white.webp'
import { 
    convertDatariesToEuro,
    productQuantityCounter,
    eurosToPay 
} from '../../utils/shoppingUtils.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasket } from '../../redux/slices/shoppingBasket'
import { removeProduct, saveProduct } from '../../redux/slices/shoppingBasket'
import { toast } from 'sonner'



function BasketCard({  product }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const basketContent = useSelector(selectBasket)
    

    // Redirection vers la page produit
    const handleProductClick = (e) => {
        e.preventDefault()
        navigate(`/shopping/product/${product.id}`)
    }


    // Ajouter un exemplaire du produit au panier
    const registerAProduct = (e) => {
        e.preventDefault()

        // Vérification de la quantité d'articles dans le panier
        const outOfStock = productQuantityCounter(basketContent, product)
        if (outOfStock) {
            toast(`⚠️ Limite de stock atteinte pour "${product.title}" (max ${product.maxQuantity}). Aucun ajout effectué.`)
            return
        }

        // Enregistrement du produit dans le panier
        dispatch(saveProduct(product))
    }
    

    // Retirer un exemplaire du produit courant du panier
    const removeProductFunction = (e) => {
        e.preventDefault()
        if (product) {
            dispatch(removeProduct(product))
        }
    }


    // Calcul prix total en dataries
    const datariesPriceTotalCalc = () => {
        return (parseFloat(
            product.price.replaceAll(' ', '')
        ) * product.quantity
        ).toLocaleString('fr-FR')
    }


    // Calcul prix total en euros
    const totalEuros = convertDatariesToEuro(eurosToPay([product]))


    return (
        <div className='basket-page-product'>
            <img 
            src={product.imageUrl} 
            alt={product.title} 
            className='basket-page-product-image'
            onClick={(e) => handleProductClick(e)}
            onKeyDown={(e) => handleProductClick(e)}
            tabIndex="0"
            title='Aller vers la page du produit'
            />
            <div className='basket-page-product-details'>
                <h3 className='basket-page-product-title-wrapper'>{product.title}</h3>
                <p className='basket-page-product-description'>{product.description}</p>
                <p className='basket-page-product-price'>
                    <span className='basket-page-product-price-section'>
                        <span className='basket-page-product-price-content'>
                            <span className='basket-page-product-price-text'>Prix : {product.price}</span>
                            <img 
                                className='basket-page-product-price-currency' 
                                src={Currency} 
                                alt="datarie républicaine"
                            />
                        </span>
                        <span className='basket-page-product-price-content'>
                            <span className='basket-page-product-price-text'>({convertDatariesToEuro(product.price)})</span>
                        </span>
                    </span>
                    <span className='basket-page-product-quantity'>
                        <span className='basket-page-product-quantity-counter'>Quantité : {product.quantity}</span>
                        <span className='basket-page-product-quantity-manage'>
                            
                        {!productQuantityCounter(basketContent, product) ? (
                            <span 
                            className='basket-page-product-quantity-button quantity-add'
                            onClick={(e) => registerAProduct(e)}
                            onKeyDown={(e) => e.key === 'Enter' && registerAProduct(e)}
                            title='Ajouter un exemplaire du produit'
                            tabIndex="0"
                            >+</span>
                        ) : (
                            <span 
                            className='basket-page-product-quantity-button disabled'
                            title='Limite de stock atteinte'
                            >+</span>
                        )}
                            <span 
                            className='basket-page-product-quantity-button quantity-remove'
                            onClick={(e) => removeProductFunction(e)}
                            onKeyDown={(e) => e.key === 'Enter' && removeProductFunction(e)}
                            title='Retirer un exemplaire du produit'
                            tabIndex="0"
                            >−</span>

                        </span>
                    </span>
                </p>
                
                <div className='basket-page-product-total-price'>
                    <h3 className='basket-page-product-total-price-title'>Total :</h3>
                    <span className='basket-page-product-total-price-dataries'>{datariesPriceTotalCalc()}<img className='basket-page-product-total-price-dataries-currency' src={Currency} alt="datarie" /></span>
                    
                    <span className='basket-page-product-total-price-euros'>
                        <span className='basket-page-product-total-price-euros-text'>({totalEuros})</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BasketCard
