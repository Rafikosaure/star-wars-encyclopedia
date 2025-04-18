import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import './MarketPage.scss'
import '../../sharedStyles/index.scss'
import ShoppingCard from '../../components/ShoppingCard/ShoppingCard.jsx'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice.js'
import Currency from '../../assets/images/credit_white.webp'
import BackArrow from '../../assets/images/back-arrow.webp'
import NextArrow from '../../assets/images/next-arrow.webp'


function MarketPage() {

    const storedProducts = useSelector(selectProducts)
    const [filteredProducts, setFilteredProducts] = useState()
    const [filterCategory, setFilterCategory] = useState('all')
    const [filterButtonsActive, setFilterButtonsActive] = useState('1')

    // Variables de pagination
    const productsPerPage = 100
    const currentPage = 1

    // Calculer les bornes de pagination
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    let currentProducts;
    if (filteredProducts) {
        currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    }


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
    }, [productFiltersFunction])


    // Style des boutons actifs / non actifs
    const filterButtonsStylesFunction = (e) => {
        setFilterButtonsActive(e.target.id)
    }


    return (
        <div className='shopping-page-section'>
            {storedProducts && filteredProducts && (
                <>
                <div className='shopping-page-filters'>

                    <button 
                    value={'all'} 
                    id='1' 
                    className={`filter-button ${filterButtonsActive === "1" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>Tous</button>
                    
                    <button 
                    value={'jedi'} 
                    id='2' 
                    className={`filter-button ${filterButtonsActive === "2" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>Jedi</button>
                    
                    <button 
                    value={'sith'} 
                    id='3' 
                    className={`filter-button ${filterButtonsActive === "3" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>Sith</button>
                    
                    <button 
                    value={'rebellion'} 
                    id='4' 
                    className={`filter-button ${filterButtonsActive === "4" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>Rébellion</button>
                    
                    <button 
                    value={'empire'} 
                    id='5' 
                    className={`filter-button empire-filter-button ${filterButtonsActive === "5" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>Empire / Premier Ordre</button>

                    <button 
                    value={'cheapest'} 
                    id='6' 
                    className={`filter-button ${filterButtonsActive === "6" ? "active" : ""}`}
                    onClick={(e) => {
                        productFiltersFunction(e.target.value)
                        setFilterCategory(e.target.value); 
                        filterButtonsStylesFunction(e)
                        localStorage.setItem('selectedFilter', e.target.value)
                        localStorage.setItem('activeButtonId', e.target.id)
                    }}>- de 5000&nbsp;<img className='market-filter-currency' src={Currency} alt="datarie républicaine" /></button>
                
                </div>
                <div className='market-arrow-page-counter'>page / total</div>
                <div className='market-arrows-section'>
                    <div tabIndex="0" className='market-arrow back'><img src={BackArrow} alt="retour aux produits précédents" /></div>
                    <div tabIndex="0" className='market-arrow next'><img src={NextArrow} alt="avance vers les produits suivants" /></div>
                </div>
                <div className='shopping-page-content'>
                    {currentProducts && (
                        currentProducts.map((product, index) => (
                            <ShoppingCard key={product.id} product={product} />
                        ))
                    )}
                </div>
                </>
            )}
        </div>
    )
}

export default MarketPage
