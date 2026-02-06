import { useState, useEffect, useCallback } from 'react'
import './MarketPage.scss'
import '../../theme/index.scss'
import ShoppingCard from '../../components/ShoppingCard/ShoppingCard.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { 
    fetchProducts, 
    selectProducts, 
    selectProductsStatus 
} from '../../redux/slices/productsSlice.js'
import { 
    selectShoppingPage, 
    setCurrentShoppingPage 
} from '../../redux/slices/shoppingPaginate.js'
import Currency from '../../assets/images/credit_white.webp'
import BackArrow from '../../assets/images/back-arrow.webp'
import NextArrow from '../../assets/images/next-arrow.webp'
import Spinner from '../../assets/images/spinner.svg'


function MarketPage() {

    const dispatch = useDispatch()
    const currentPage = useSelector(selectShoppingPage);
    const storedProducts = useSelector(selectProducts);
    const productsStatus = useSelector(selectProductsStatus);
    const [filteredProducts, setFilteredProducts] = useState();
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterButtonsActive, setFilterButtonsActive] = useState('1');
    
    // Supprimer le jeton de transaction dans le stockage de session
    sessionStorage.removeItem('shoppingStringSession');

    // Variables de pagination
    const productsPerPage = 6;

    // Calculer les bornes de pagination
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    let currentProducts;
    if (filteredProducts) {
        currentProducts = filteredProducts
        ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
        : []
    }
    const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage)


    // Gestion des filtres des produits à afficher
    const productFiltersFunction = useCallback(() => {
        if (filterCategory === "all") {
            setFilteredProducts(storedProducts)
        } else if(filterCategory === "jedi") {
            setFilteredProducts(storedProducts.filter(product => product.tags.includes('jedi')))
        } else if(filterCategory === "sith") {
            setFilteredProducts(storedProducts.filter(product => product.tags.includes('sith')))
        } else if(filterCategory === "rebellion") {
            setFilteredProducts(storedProducts.filter(product => product.tags.includes('rébellion')))
        } else if(filterCategory === "empire") {
            setFilteredProducts(storedProducts.filter(product => product.tags.includes('empire')))
        } else if(filterCategory === "cheapest") {
            setFilteredProducts(

                // Filtrer les articles de - de 5000 crédits
                storedProducts.filter(
                product => parseFloat(product.price.replaceAll(" ", "")) < 5000)
                
                // Tri par prix des articles filtrés (ordre croissant)
                .sort(function (a, b) {
                return parseFloat(a.price.replaceAll(" ", "")) - parseFloat(b.price.replaceAll(" ", ""))
            }))
        }
    }, [filterCategory, storedProducts])


    // Récupération des données de l'API
    useEffect(() => {
        if (productsStatus === 'idle') {
          dispatch(fetchProducts());
        }
    }, [dispatch, productsStatus]);


    // Persistance des filtres
    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedFilter')
        const savedButtonId = localStorage.getItem('activeButtonId')
        if (savedFilter) {
            setFilterCategory(savedFilter)
            productFiltersFunction()
        }
        if (savedButtonId) {
            setFilterButtonsActive(savedButtonId)
        }
    }, [productFiltersFunction])


    // Filtrage indépendant du rendu
    useEffect(() => {
        productFiltersFunction()
    }, [productFiltersFunction, dispatch])


    // Style des boutons actifs / non actifs
    const filterButtonsStylesFunction = (e) => {
        setFilterButtonsActive(e.target.id)
    }


    // Avancer à la page suivante
    const handleNextPage = () => {
        dispatch(setCurrentShoppingPage(Math.min(currentPage + 1, totalPages)))
    }
    
    
    // Reculer à la page précédente
    const handlePreviousPage = () => {
        dispatch(setCurrentShoppingPage(Math.max(currentPage - 1, 1)))
    }


    // Gestion des fonctions des filtres
    const handleFilterButtonClick = (e) => {
        dispatch(setCurrentShoppingPage(1))
        productFiltersFunction(e.target.value)
        setFilterCategory(e.target.value); 
        filterButtonsStylesFunction(e)
        localStorage.setItem('selectedFilter', e.target.value)
        localStorage.setItem('activeButtonId', e.target.id)
    }


    // Gestion de l'affichage asynchrone
    if (productsStatus === 'failed') return <p>Erreur lors du chargement.</p>;


    return (
        <div className='app shopping-page-section'>
            {storedProducts && filteredProducts && (
                <>
                <div className='shopping-page-filters'>

                    <button 
                    value={'all'} 
                    id='1' 
                    className={`filter-button ${filterButtonsActive === "1" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title='Afficher tous les produits'
                    >Tous</button>
                    
                    <button 
                    value={'jedi'} 
                    id='2' 
                    className={`filter-button ${filterButtonsActive === "2" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title='Afficher les produits Jedi'
                    >Jedi</button>
                    
                    <button 
                    value={'sith'} 
                    id='3' 
                    className={`filter-button ${filterButtonsActive === "3" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title='Afficher les produits Sith'
                    >Sith</button>
                    
                    <button 
                    value={'rebellion'} 
                    id='4' 
                    className={`filter-button ${filterButtonsActive === "4" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title='Afficher les produits de la Rébellion'
                    >Rébellion</button>
                    
                    <button 
                    value={'empire'} 
                    id='5' 
                    className={`filter-button empire-filter-button ${filterButtonsActive === "5" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title="Afficher les produits de l'Empire / du Premier Ordre"
                    >Empire / Premier Ordre</button>

                    <button 
                    value={'cheapest'} 
                    id='6' 
                    className={`filter-button ${filterButtonsActive === "6" ? "active" : ""}`}
                    onClick={(e) => handleFilterButtonClick(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilterButtonClick(e)}
                    title='Afficher les produits à moins de 5000 dataries'
                    >- de 5000&nbsp;<img className='market-filter-currency' src={Currency} alt="datarie républicaine" /></button>
                
                </div>
                <div className='market-arrow-page-counter'>
                    <span 
                        className='market-arrow-page-counter-text'>
                        {currentPage} / {totalPages}
                    </span>
                </div>
                <div className='market-arrows-section'>

                    {currentPage > 1 && (
                    <div tabIndex="0" className='market-arrow back'
                        onKeyDown={(e) => e.key === 'Enter' && handlePreviousPage()}
                        >
                        <img 
                        onClick={() => handlePreviousPage()}
                        title='Retourner à la page précédente'
                        src={BackArrow} 
                        alt="retour aux produits précédents" />
                    </div>
                    )}

                    {currentPage < totalPages && (
                    <div tabIndex="0" 
                    className='market-arrow next'
                    onKeyDown={(e) => e.key === 'Enter' && handleNextPage()}
                        >
                        <img 
                        onClick={() => handleNextPage()}
                        title='Aller à la page suivante'
                        src={NextArrow} 
                        alt="avance vers les produits suivants" />
                    </div>
                    )}

                </div>
                <div className='shopping-page-content'>
                    {currentProducts && (
                        currentProducts.map((product) => (
                            <ShoppingCard key={product.id} product={product} />
                        ))
                    )}
                    {productsStatus === 'loading' && (
                        <img src={Spinner} className='loading-spinner-style' alt="Chargement des articles..." />
                    )}
                </div>
                </>
            )}
        </div>
    )
}

export default MarketPage
