import '../../theme/index.scss'
import './Basket.scss'
import { useState, useRef } from 'react'
import { 
    mergeBasketWithCatalog,
    basketTotalProductsCalc, 
} from '../../utils/shoppingUtils.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice.js'
import { selectBasket } from '../../redux/slices/shoppingBasket'
import { emptyBasket, removeProduct } from '../../redux/slices/shoppingBasket'
import EmptyBasket from '../../assets/images/shopping-basket-empty-white.svg?react'
import FullBasket from '../../assets/images/shopping-basket-full-white.svg?react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
// import useClickOutside from '../../hooks/useClickOutside.js'
import useEscapeKey from '../../hooks/useEscapeKey.js'



function Basket() {

    const basketContent = useSelector(selectBasket)
    const productsArray = useSelector(selectProducts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpenBasket, setIsOpenBasket] = useState(false)
    const [basketFade, setBasketFade] = useState("fade-in")
    const [basketDisplay, setBasketDisplay] = useState("none")
    const basketMenuRef = useRef(null);
    const basketButtonRef = useRef(null);


    // Fermer le panier
    const closeBasket = () => {
        setIsOpenBasket(false);
        setBasketFade("fade-out");
        setTimeout(() => {
            setBasketDisplay("none");
        }, 300);
    }


    // Ouvrir le panier
    const openBasket = () => {
        setIsOpenBasket(true)
        setBasketFade("fade-in")
        setBasketDisplay("block")
    }


    // Gérer le clic en dehors du panier
    // useClickOutside(
    //     [basketMenuRef, basketButtonRef],
    //     closeBasket
    // )


    // Gérer la touche "Échap" pour fermer le panier
    useEscapeKey(() => {
        if (isOpenBasket) {
            closeBasket()
        }
    })


    // Ouvrir ou fermer le panier
    const openOrCloseBasket = (e) => {
        e.preventDefault()
        if (isOpenBasket) {
            closeBasket()
        } else {
            openBasket()
        }
    }


    // Se rendre sur la page de panier
    const goToBasket = (e) => {
        e.preventDefault()
        if (basketContent.length !== 0) {
            navigate("/basket")
        }
    }


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
        toast(`Un exemplaire de "${product.title}" a été retiré du panier !`)
    }


    // Compte des produits dans le panier
    const totalBasketProducts = basketTotalProductsCalc(basketContent)


    // Regrouper les articles par ID avec leur quantité
    const groupedBasket = mergeBasketWithCatalog(basketContent, productsArray)


    return (
        <>

        <div
            className='is-open-basket-button'
            ref={basketButtonRef}
            onClick={(e) => openOrCloseBasket(e)}
            onKeyDown={(e) => e.key === 'Enter' && openOrCloseBasket(e)}
            tabIndex="0"
            title={isOpenBasket ? 'Fermer le panier' : 'Ouvrir le panier'}
        >{basketContent.length === 0 ? (
            <EmptyBasket />
        ) : (
            <FullBasket />
        )}
        </div>

        <div className={`basket-wrapper ${basketFade}`}
        style={{ display: basketDisplay }}
        ref={basketMenuRef}
        >
            <span className='basket-title-all'
            >
                {basketContent.length === 0 ? (
                    <div
                    title='Le panier est vide'
                    className='basket-title-empty-basket basket-title-style'
                    ><EmptyBasket /></div>
                ) : (
                    <div 
                    onClick={(e) => goToBasket(e)}
                    onKeyDown={(e) => e.key === 'Enter' && goToBasket(e)}
                    title='Aller au panier'
                    className='basket-title-full-basket basket-title-style'
                    tabIndex="0"
                    ><FullBasket /></div>
                )}
                <h1 className='basket-title'>Nombre de produits : {totalBasketProducts}</h1>
            </span>
            
            <div className={`basket-content ${basketContent.length !== 0 && 'basket-content-empty'}`}>
                {basketContent.length !== 0 ? (
                    <>
                    <span className='basket-content-manager-section'>
                        <p 
                        className='basket-empty-button'
                        onClick={(e) => emptyBasketFunction(e)}
                        onKeyDown={(e) => e.key === 'Enter' && emptyBasketFunction(e)}
                        title='Vider le panier'
                        tabIndex="0"
                        >⨠ Vider le panier</p>

                        <p 
                        className='basket-page-link'
                        onClick={(e) => goToBasket(e)}
                        onKeyDown={(e) => e.key === 'Enter' && goToBasket(e)}
                        title='Visiter le panier'
                        tabIndex="0"
                        >⨠ Voir panier</p>
                    </span>
                    

                    <p className='basket-product'><strong>Contenu du panier :</strong></p>
                    {groupedBasket.map((product) => (
                        
                        <span key={product.id} className='basket-product-wrapper'>
                            <p className='basket-product'>
                                <strong>x{product.quantity} - </strong>
                                {product.title}
                             </p>
                            <p 
                                title='Retirer le produit du panier'
                                onClick={(e) => removeProductFunction(e, product)}
                                onKeyDown={(e) => e.key === 'Enter' && removeProductFunction(e, product)}
                                className='basket-product-remove-cross'
                                tabIndex="0"
                            >✖</p>
                        </span> 
                    ))}
                    </>
                ) : (
                    <p className='basket-product'><strong>Contenu du panier :</strong> aucun produit</p>
                )}
            </div>
        </div>
        </>
        
    )
}

export default Basket
