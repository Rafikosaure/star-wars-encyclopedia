import React from 'react'
import './Basket.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectBasket } from '../../redux/slices/shoppingBasket'
import { emptyBasket, removeProduct } from '../../redux/slices/shoppingBasket'
import { ReactComponent as EmptyBasket } from '../../assets/images/shopping-basket-empty-white.svg'
import { ReactComponent as FullBasket } from '../../assets/images/shopping-basket-full-white.svg'
import { toast } from 'sonner'


function Basket() {

    const basketContent = useSelector(selectBasket)
    const dispatch = useDispatch()


    // Vider le panier
    const emptyBasketFunction = (e) => {
        e.preventDefault()
        dispatch(emptyBasket())
        toast("Le panier a été vidé !")
    }


    // Retirer du panier un exemplaire du produit
    const removeProductFunction = (e, product) => {
        e.preventDefault()
        dispatch(removeProduct(product))
        toast(`L'article "${product.title}" a été retiré du panier !`)
    }


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


    return (
        <div className='basket-wrapper'>
            <span className='basket-title-all'>
                {basketContent.length === 0 ? (
                    <div
                    title='Le panier est vide'
                    ><EmptyBasket /></div>
                ) : (
                    <div 
                    onClick={(e) => emptyBasketFunction(e)}
                    title='Cliquez pour vider le panier'
                    className='basket-title-full-basket'
                    ><FullBasket /></div>
                )}
                <h1 className='basket-title'>Nombre d'articles : {basketContent.length}</h1>
            </span>
            
            <div className='basket-content'>
                {basketContent.length !== 0 ? (
                    <>
                    <p className='basket-product'><strong>Contenu du panier :</strong></p>
                    {groupedBasket.map((product, index) => (
                        
                        <span key={product.id} className='basket-product-wrapper'>
                            <p className='basket-product'>
                                <strong>x{product.quantity} - </strong>
                                {product.title}
                             </p>
                            <p 
                                title='Retirer le produit du panier'
                                onClick={(e) => removeProductFunction(e, product)}
                                className='basket-product-remove-cross'
                            >✖</p>
                        </span> 
                    ))}
                    </>
                ) : (
                    <p className='basket-product'><strong>Contenu du panier :</strong> aucun produit</p>
                )}
            </div>
        </div>
    )
}

export default Basket
