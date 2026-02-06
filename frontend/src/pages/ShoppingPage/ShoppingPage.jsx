import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ShoppingPage.scss'
import '../../theme/index.scss'
import { Outlet } from 'react-router-dom'
import Basket from '../../components/Basket/Basket.jsx'
import SimulatedMarketBanner from '../../components/SimulatedMarketBanner/SimulatedMarketBanner.jsx'



function ShoppingPage() {

    const navigate = useNavigate()
    const location = useLocation() 


    // Redirection en cas d'erreur d'URL
    useEffect(() => {
        if (location.pathname === "/shopping" || location.pathname === "/shopping/") {
            navigate('/shopping/market')
        }
    }, [location, navigate])


    return (
        <div className='app shopping-page-wrapper'>
            <div className='shopping-page-background' />
            <SimulatedMarketBanner />
            <h2 className='shopping-page-title'>Boutique de Wattoo</h2>
            <div className='shopping-basket-wrapper'>
                <Basket />
            </div>
            <div className='shopping-page-outlet'>
                <Outlet />
            </div>
            
        </div>
    )
}

export default ShoppingPage
