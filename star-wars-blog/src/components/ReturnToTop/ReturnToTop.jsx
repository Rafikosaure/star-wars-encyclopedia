import { useState, useEffect } from 'react';
import './ReturnToTop.scss';
import '../../theme/index.scss';
import ArrowToTop from '../../assets/images/arrow_to_top.svg';



function ReturnToTop() {

    const [isVisible, setIsVisible] = useState(false);
    const [fadeEffect, setFadeEffect] = useState('fade-in');


    // Afficher ou non le bouton selon la hauteur de la page
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
                setFadeEffect('fade-in');
            } else {
                setTimeout(() => {
                    setIsVisible(false);
                }, 300);
                setFadeEffect('fade-out');
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Nettoyage de l'écouteur
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);


    // Retourner en haut de page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (
        isVisible && (
            <div className={`return-to-top-content ${fadeEffect}`}>
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
