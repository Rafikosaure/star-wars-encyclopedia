import React from 'react'
import './ProductPage.scss'
import '../../sharedStyles/index.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice'
import { saveProduct, removeProduct, selectBasket } from '../../redux/slices/shoppingBasket'
import { productQuantityCounter } from '../../utils/productQuantityCounter'
import { Link } from 'react-router-dom'
import ReturnArrow from '../../assets/images/return-arrow.webp'
import Currency from '../../assets/images/credit_white.webp'
import { toast } from 'sonner'



function ProductPage() {

    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productsArray = useSelector(selectProducts)
    const basketContent = useSelector(selectBasket)
    const [currentProduct, setCurrentProduct] = useState()
    const [currentProductCount, setCurrentProductCount] = useState()


    // Récupération de l'article depuis l'API
    useEffect(() => {
        if (productsArray) {
            const product = productsArray.find((product) => product.id.toString(10) === productId)
            if (product) {
                setCurrentProduct(product)
            } else {
                navigate("*")
            }
        } else {
            navigate("*");
        }
    }, [productsArray, productId, currentProduct, navigate]);


    // Compteur d'occurrence du produit courant dans le panier
    useEffect(() => {
        if (productsArray && currentProduct) {
            setCurrentProductCount(basketContent.reduce((acc, product) => {
                return product === currentProduct ? acc + 1 : acc
            }, 0))
        }
    }, [currentProduct, productsArray, basketContent])


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


    return (
        <div className='product-page-wrapper'>
            <div className='product-page-div-return' title='Retour vers la page principale de la boutique'>
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
                        <img src={currentProduct.imageUrl} alt={currentProduct.title} />
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
                                >
                                {currentProduct.price} 
                                <img 
                                className='product-page-data-price-currency' 
                                src={Currency} 
                                alt="datarie républicaine" 
                                />

                                {basketContent.includes(currentProduct) ? (
                                    <>
                                    <div className='product-page-product-add-remove'>
                                        {!productQuantityCounter(basketContent, currentProduct) && (
                                            <p className='product-page-data-add-and-remove-button add'
                                                title='Ajouter un article au panier'
                                                tabIndex="0"
                                                onClick={(e) => saveProductFunction(e)}
                                                onKeyDown={(e) => e.key === 'Enter' && saveProductFunction(e)}
                                            >+</p>
                                        )}

                                        <p className='product-page-data-add-and-remove-button remove'
                                            title='Retirer un article du panier'
                                            tabIndex="0"
                                            onClick={(e) => removeProductFunction(e)}
                                            onKeyDown={(e) => e.key === 'Enter' && removeProductFunction(e)}
                                        >−</p>
                                    </div>

                                    <p className='product-page-data-price-basket-quantity'>Quantité : {currentProductCount}</p>
                                    </>
                                    
                                ) : (
                                    <div className='product-page-product-add-remove'>
                                        <p 
                                        className='product-page-data-add-and-remove-button add'
                                        title='Ajouter un article au panier'
                                        tabIndex="0"
                                        onClick={(e) => saveProductFunction(e)}
                                        onKeyDown={(e) => e.key === 'Enter' && saveProductFunction(e)}
                                        >+</p>
                                    </div>
                                    
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
