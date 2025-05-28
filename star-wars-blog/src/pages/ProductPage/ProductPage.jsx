import './ProductPage.scss'
import Avatar from '../../assets/images/EmojiBlitzBobaFett1.webp'
import '../../theme/index.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectProducts,
    selectProductsStatus, 
    fetchProducts, 
} from '../../redux/slices/productsSlice'
import { 
    saveProduct, 
    removeProduct, 
    selectBasket 
} from '../../redux/slices/shoppingBasket'
import { 
    productQuantityCounter,
    getProductCountInBasket 
} from '../../utils/shoppingUtils.js'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import Currency from '../../assets/images/credit_white.webp'
import { toast } from 'sonner'



function ProductPage() {

    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const storedProducts = useSelector(selectProducts)
    const productsStatus = useSelector(selectProductsStatus);
    const basketContent = useSelector(selectBasket)
    const [currentProduct, setCurrentProduct] = useState()
    const [currentProductCount, setCurrentProductCount] = useState()
    const currencyName = "dataries républicaines"

    
    // Récupération des données de l'API
    useEffect(() => {
        if (productsStatus === 'idle') {
          dispatch(fetchProducts());
        }
    }, [dispatch, productsStatus]);


    // Récupération de l'article depuis l'API
    useEffect(() => {
        if (storedProducts) {
            const product = storedProducts.find((product) => product.id.toString(10) === productId)
            if (product) {
                setCurrentProduct(product)
            } else {
                // navigate("/shopping/market")
            }
        } else {
            navigate("*");
        }
    }, [storedProducts, basketContent, productId, currentProduct, navigate]);


    // Compteur d'occurrence du produit courant dans le panier
    useEffect(() => {
        if (basketContent && currentProduct) {
            setCurrentProductCount(getProductCountInBasket(basketContent, currentProduct))
        }
    }, [currentProduct, basketContent])


    // Enregistrer un exemplaire du produit courant dans le panier
    const saveProductFunction = (e) => {
        e.preventDefault()
        if (currentProduct) {

            // Vérification de la quantité d'articles dans le panier
            const outOfStock = productQuantityCounter(basketContent, currentProduct)
            if (outOfStock) {
                toast(`⚠️ Limite de stock atteinte pour "${currentProduct.title}" (max ${currentProduct.maxQuantity}). Aucun ajout effectué.`)
                return
            }

            // Enregistrement du produit dans le panier
            dispatch(saveProduct(currentProduct))
            toast(`L'article "${currentProduct.title}" a été ajouté au panier !`);
        }
    }

    
    // Retirer un exemplaire du produit courant du panier
    const removeProductFunction = (e) => {
        e.preventDefault()
        if (currentProduct) {
            dispatch(removeProduct(currentProduct))
            toast(`L'article "${currentProduct.title}" a été retiré du panier !`)
        }
    }


    // Gestion de l'affichage asynchrone
    if (productsStatus === 'loading') return <p>Chargement...</p>;
    if (productsStatus === 'failed') return <p>Erreur lors du chargement.</p>;


    return (
        <div className='product-page-wrapper'>
            <div className='product-page-div-return' title='Retour vers la liste des produits'>
                <Link to={`/shopping/market`} className='product-page-arrow-link'>
                    <img src={ReturnArrow} alt="Retour vers la page principale de la boutique" />
                </Link>
            </div>
            {currentProduct && (
                <div className="product-page-main">
                    <div className="product-page-picture-section">
                        {currentProduct.maxQuantity && currentProduct.maxQuantity <= currentProductCount && (
                            <div className="product-page-picture-overlay">
                                <p className='product-page-picture-overlay-text'>stock épuisé</p>
                            </div>
                        )}
                        {currentProduct.largeImageUrl !== "" ? (
                            <img src={currentProduct.largeImageUrl} alt={currentProduct.title} />
                        ) : (
                            <img src={Avatar} alt={currentProduct.title} />
                        )}
                    </div>
                    <section className="product-page-data-section">
                        <h2 className='product-page-data-title'>{currentProduct.title}</h2>
                        <p className="product-page-data">{currentProduct.description}</p>
                        <br />
                        <div className="product-page-data-tags">
                            <p className='product-page-data-category-title'>Matériaux : </p> 
                            {currentProduct.materials.map((tag, index) => (
                                <p className='product-page-data' key={index}>- {tag}</p>
                            ))}
                        </div>
                        <div className='product-page-data-footer'>
                            <div 
                                className="product-page-data-price"
                                title={`${currentProduct.price} ${currencyName}`}
                                >
                                {currentProduct.price} 
                                <img 
                                className='product-page-data-price-currency' 
                                src={Currency} 
                                alt={currencyName}
                                />

                                {currentProduct && (
                                    <>
                                    <div className='product-page-product-add-remove'>
                                        {!productQuantityCounter(basketContent, currentProduct) && (
                                            <p className='product-page-data-add-and-remove-button'
                                                title='Ajouter un article au panier'
                                                tabIndex="0"
                                                onClick={(e) => saveProductFunction(e)}
                                                onKeyDown={(e) => e.key === 'Enter' && saveProductFunction(e)}
                                            >+</p>
                                        )}

                                        {basketContent.find(product => product.id === currentProduct.id) && (
                                            <p className='product-page-data-add-and-remove-button'
                                                title='Retirer un article du panier'
                                                tabIndex="0"
                                                onClick={(e) => removeProductFunction(e)}
                                                onKeyDown={(e) => e.key === 'Enter' && removeProductFunction(e)}
                                            >−</p>
                                        )}
                                    </div>
                                    
                                    <p className='product-page-data-price-basket-quantity'>Quantité : {currentProductCount}</p>
                                    </>
                                )}
                                    
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default ProductPage
