import './ShoppingCard.scss'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import { toast } from 'sonner'
import { selectProducts } from '../../redux/slices/productsSlice.js'
import { 
    saveProduct, 
    removeProduct, 
    selectBasket 
} from '../../redux/slices/shoppingBasket.js'
import { useDispatch, useSelector } from 'react-redux'
import { 
    productQuantityCounter,
    mergeBasketWithCatalog 
} from '../../utils/shoppingUtils.js'
import Currency from '../../assets/images/credit_white.webp'
import { useNavigate } from 'react-router-dom'



function ShoppingCard({ product }) {

    const dispatch = useDispatch()
    const storedProducts = useSelector(selectProducts)
    const rawBasket = useSelector(selectBasket)
    const basketContent = mergeBasketWithCatalog(rawBasket, storedProducts);
    const navigate = useNavigate()


    // Ajouter un exemplaire du produit au panier
    const registerAProduct = (e) => {
        e.preventDefault()

        // Vérification de la quantité d'articles dans le panier
        if (basketContent) {
            const outOfStock = productQuantityCounter(basketContent, product)
            if (outOfStock) {
                toast(`⚠️ Limite de stock atteinte pour "${product.title}" (max ${product.maxQuantity}). Aucun ajout effectué.`)
                return
            }
        }
        
        // Enregistrement du produit dans le panier
        dispatch(saveProduct({ id: product.id, maxQuantity: product.maxQuantity }))
        toast(`Un exemplaire de "${product.title}" a été ajouté au panier !`);
    }
    

    // Retirer un exemplaire du produit courant du panier
    const removeProductFunction = (e) => {
        e.preventDefault()
        if (product) {
            dispatch(removeProduct({ id: product.id }))
            toast(`Un exemplaire de "${product.title}" a été retiré du panier !`)
        }
    }


    return (
        <div 
        className='shopping-card-wrapper'
        >   
            {product && product.maxQuantity && product.maxQuantity && productQuantityCounter(basketContent, product) && (
                <div className='shopping-card-stock-limit-overlay' 
                    onClick={() => navigate(`/shopping/product/${product.id}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/shopping/product/${product.id}`)}
                    tabIndex="0"
                    title='Aller vers la page du produit'
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
                {product && (
                    <>
                    {basketContent.find(item => item.id === product.id) && (
                        <p className='shopping-basket-add-or-remove-product-button remove-product-button'
                        onClick={(e) => removeProductFunction(e)}
                        onKeyDown={(e) => e.key === 'Enter' && removeProductFunction(e)}
                        tabIndex="0"
                        title='Retirer un article du panier'
                        >−</p>
                    )}
                    

                    {!productQuantityCounter(basketContent, product) && (
                        <p className='shopping-basket-add-or-remove-product-button add-product-button'
                        onClick={(e) => registerAProduct(e)}
                        onKeyDown={(e) => e.key === 'Enter' && registerAProduct(e)}
                        tabIndex="0"
                        title='Ajouter un article au panier'
                        >+</p>
                    )}
                    </>
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
