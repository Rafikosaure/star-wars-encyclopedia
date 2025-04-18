import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ShoppingPage.scss'
import '../../sharedStyles/index.scss'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productsSlice.js'
import { saveProducts } from '../../redux/slices/productsSlice.js'
import config from '../../config.js'
import Basket from '../../components/Basket/Basket.jsx'


function ShoppingPage() {

    const storedProducts = useSelector(selectProducts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const apiMode = 'test'


    // Récupération des articles de l'API depuis le serveur NodeJS
    useEffect(() => {
        if (storedProducts.length === 0) {
            fetch(`${config.serverEndpoint}/shopping/getArticles/${apiMode}`)
            .then(response => response.json())
            .then(data => {
                const activeData = data.filter(item => item.isActive)
                const sortedData = activeData.sort((a, b) => a.title.localeCompare(b.title));
                dispatch(saveProducts(sortedData))
            })
            .catch(error => console.log(error))
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
