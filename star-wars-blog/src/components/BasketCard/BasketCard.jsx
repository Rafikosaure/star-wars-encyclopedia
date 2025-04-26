import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BasketCard.scss'
import Currency from '../../assets/images/credit_white.webp'
import { convertDatariesToEuro } from '../../utils/convertDatariesToEuro'


function BasketCard({  product, index }) {

    const navigate = useNavigate()


    // Redirection vers la page produit
    const handleProductClick = (e) => {
        e.preventDefault()
        navigate(`/shopping/product/${product.id}`)
    }


    return (
        <div key={product.id} className='basket-page-product'>
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
                            <span className='basket-page-product-quantity-button quantity-add'>+</span>
                            <span className='basket-page-product-quantity-button quantity-remove'>−</span>
                        </span>
                    </span>
                </p>
                
                <div className='basket-page-product-total-price'>
                    <h3 className='basket-page-product-total-price-title'>Total :</h3>
                    <span className='basket-page-product-total-price-dataries'>{(parseFloat(product.price.replaceAll(' ', '')) * product.quantity).toLocaleString('fr-FR')}<img className='basket-page-product-total-price-dataries-currency' src={Currency} alt="datarie" /></span>
                    
                    <span className='basket-page-product-total-price-euros'>
                        <span className='basket-page-product-total-price-euros-text'>({convertDatariesToEuro(String(parseFloat(product.price.replaceAll(' ', '')) * product.quantity))})</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BasketCard
