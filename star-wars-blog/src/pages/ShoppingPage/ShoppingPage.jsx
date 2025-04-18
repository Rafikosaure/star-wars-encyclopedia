import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ShoppingPage.scss'
import '../../sharedStyles/index.scss'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice.js'
import { saveProducts } from '../../redux/slices/productsSlice.js'
import Basket from '../../components/Basket/Basket.jsx'
import shoppingData from '../../data/shoppingData.json'



function ShoppingPage() {

    const storedProducts = useSelector(selectProducts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    // Récupération et tri des produits de vente
    useEffect(() => {
        if (storedProducts.length === 0) {
            const activeData = shoppingData.filter(item => item.isActive)
            const sortedData = activeData.sort((a, b) => a.title.localeCompare(b.title));
            dispatch(saveProducts(sortedData))
        }    
    }, [dispatch, storedProducts])


    // Redirection en cas d'erreur d'URL
    useEffect(() => {
        if (location.pathname === "/shopping" || location.pathname === "/shopping/") {
            navigate('/shopping/market')
        }
    }, [location, navigate])


    return (
        <div className='app shopping-page-wrapper'>
            <div className='shopping-page-background' />
            <div className='shopping-page-maintenance'>Service de shopping expérimental : achats non-possibles</div>
            <h2 className='shopping-page-title'>Boutique de Wattoo</h2>
            <div className='shopping-basket-wrapper'>
                <Basket />
            </div>
            <Outlet />
        </div>
    )
}

export default ShoppingPage
