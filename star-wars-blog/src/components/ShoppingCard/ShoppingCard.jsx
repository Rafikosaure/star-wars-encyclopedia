import React from 'react'
import './ShoppingCard.scss'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import { ReactComponent as EmptyBasket } from '../../assets/images/shopping-basket-empty-white.svg'
import { ReactComponent as FullBasket } from '../../assets/images/shopping-basket-full-white.svg'
import { toast } from 'sonner'
import { saveProduct, selectBasket } from '../../redux/slices/shoppingBasket'
import { useDispatch, useSelector } from 'react-redux'
import Currency from '../../assets/images/credit_white.webp'



function ShoppingCard({ product }) {

    const dispatch = useDispatch()
    const basketContent = useSelector(selectBasket)


    // Ajouter un exemplaire du produit au panier
    const registerAProduct = (e) => {
        e.preventDefault()
        dispatch(saveProduct(product))
        toast(`L'article "${product.title}" a été ajouté au panier !`);
    }
    

    return (
        <div 
        className='shopping-card-wrapper'
        >
            {product && (
                <>
                <Link className='shopping-card-link'
                to={`/shopping/product/${product.id}`}
                >
                    <div className='shopping-card-image'>
                        <div className='shopping-card-image-overlay' />
                        {product.imageUrl !== "" ? (
                            <img src={product.imageUrl} alt={product.title} />
                        ) : (
                            <img src={Avatar} alt={product.title} />
                        )}
                        
                    </div>
                    <h2 className='shopping-card-title'>{product.title}</h2>
                    <div className='shopping-card-description-section'>
                        <p className='shopping-card-description'>{product.description}</p>
                        <p className='shopping-card-price'>{product.price}&nbsp;&nbsp;<img className='shopping-card-price-currency' alt='datarie républicaine' src={Currency} />
                        </p>
                    </div>                    
                </Link>
                <div 
                className='shopping-basket-image' 
                title='Ajouter au panier'
                onClick={(e) => registerAProduct(e)}
                >
                    {basketContent.includes(product) ? (
                        <FullBasket />
                    ) : (
                        <EmptyBasket />
                    )}
                </div>
                </>
            )}
        </div>
    )
}

export default ShoppingCard
