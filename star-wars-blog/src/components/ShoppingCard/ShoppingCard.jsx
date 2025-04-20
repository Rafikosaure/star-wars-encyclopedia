import React from 'react'
import './ShoppingCard.scss'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
// import { ReactComponent as EmptyBasket } from '../../assets/images/shopping-basket-empty-white.svg'
// import { ReactComponent as FullBasket } from '../../assets/images/shopping-basket-full-white.svg'
import { toast } from 'sonner'
import { saveProduct, removeProduct, selectBasket } from '../../redux/slices/shoppingBasket'
import { useDispatch, useSelector } from 'react-redux'
import { productQuantityCounter } from '../../utils/productQuantityCounter'
import Currency from '../../assets/images/credit_white.webp'
import { useNavigate } from 'react-router-dom'



function ShoppingCard({ product }) {

    const dispatch = useDispatch()
    const basketContent = useSelector(selectBasket)
    const navigate = useNavigate()


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
        toast(`L'article "${product.title}" a été ajouté au panier !`);
    }
    

    // Retirer un exemplaire du produit courant du panier
    const removeProductFunction = (e) => {
        e.preventDefault()
        if (product) {
            dispatch(removeProduct(product))
        }
    }




    return (
        <div 
        className='shopping-card-wrapper'
        >   
            {product && product.maxQuantity && product.maxQuantity && productQuantityCounter(basketContent, product) && (
                <div className='shopping-card-stock-limit-overlay' 
                onClick={() => navigate(`/shopping/product/${product.id}`)}
                >
                    <p className='shopping-card-stock-limit-text'>
                        stock épuisé
                    </p>
                </div>
            )}
            <div 
            className='shopping-basket-add-or-remove-product-section' 
            title='Ajouter au panier'
            >
                {basketContent.includes(product) ? (
                    <>
                    <p className='shopping-basket-add-or-remove-product-button remove-product-button'
                    onClick={(e) => removeProductFunction(e, product)}
                    title='Retirer un article du panier'
                    >−</p>

                    {!productQuantityCounter(basketContent, product) && (
                        <p className='shopping-basket-add-or-remove-product-button add-product-button'
                        onClick={(e) => registerAProduct(e)}
                        title='Ajouter un article au panier'
                        >+</p>
                    )}
                    </>
                ) : (
                    <p className='shopping-basket-add-or-remove-product-button add-product-button'
                    onClick={(e) => registerAProduct(e)}
                    title='Ajouter un article au panier'
                    >+</p>
                )}
            </div>
            {product && (
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
            )}
        </div>
    )
}

export default ShoppingCard
