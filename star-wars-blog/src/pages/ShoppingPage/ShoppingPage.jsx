import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ShoppingPage.scss'
import '../../theme/index.scss'
import { Outlet } from 'react-router-dom'
import Basket from '../../components/Basket/Basket.jsx'
import ReturnToTop from '../../components/ReturnToTop/ReturnToTop.jsx'



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
            <ReturnToTop />
            <div className='shopping-page-background' />
            <div className='shopping-page-maintenance'>Service de shopping expérimental : achats simulés</div>
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
