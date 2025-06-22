// import './ReturnToTop.scss';
// import ArrowToTop from '../../assets/images/arrow_to_top.svg';


// function ReturnToTop() {
//     return (
//         <div className="return-to-top-content">
//             <button 
//                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
//                 title='Retour en haut de page'
//                 className='return-to-top-button'
//                 >
//                 <img src={ArrowToTop} alt="Retour en haut" />
//             </button>
//         </div>
//     )
// }

// export default ReturnToTop


import { useState, useEffect } from 'react';
import './ReturnToTop.scss';
import ArrowToTop from '../../assets/images/arrow_to_top.svg';

function ReturnToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Nettoyage de l'écouteur
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <div className="return-to-top-content">
                <button 
                    onClick={scrollToTop} 
                    title="Retour en haut de page"
                    className="return-to-top-button"
                >
                    <img className='arrow-to-top' src={ArrowToTop} alt="Retour en haut" />
                </button>
            </div>
        )
    );
}

export default ReturnToTop;
