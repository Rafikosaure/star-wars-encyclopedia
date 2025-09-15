import { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../../redux/slices/dozenSlice'
import useClickOutside from '../../hooks/useClickOutside.js'
import useEscapeKey from '../../hooks/useEscapeKey.js'
import './BurgerMenu.scss'
import '../../theme/index.scss'
import CategoryData from '../../data/localApiCategories.json'



export default function BurgerMenu() {

    const dispatch = useDispatch()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [openWikiLinks, setOpenWikiLinks] = useState('none')
    const [wikiButtonActive, setWikiButtonActive] = useState('')
    const [burgerMenuFade, setBurgerMenuFade] = useState('fade-in')
    const burgerButtonRef = useRef(null)
    const burgerMenuRef = useRef(null)
    


    useEffect(() => {
        // Récupérer les identifiants des catégories et créer les URLs
        const categoryURLs = CategoryData.map(category => {
            return `/category/${category._id}`
        })
        
        // Vérifier si l'URL actuelle correspond à une des catégories
        if (categoryURLs.includes(location.pathname)) {

            // Si oui, activer les styles du bouton "documentation"
            setWikiButtonActive('--active')
        } else {
            setWikiButtonActive('')
        }
    }, [location.pathname, wikiButtonActive])


    // Gestion des styles du bouton "documentation"
    // et de l'affichage des liens
    const openWikiLinksFunction = (e) => {
        e.preventDefault()
        if (openWikiLinks === 'block') {
            setOpenWikiLinks('none')
            setWikiButtonActive('')
        } else {
            setOpenWikiLinks('block')
            setWikiButtonActive('--active')
        }
    }


    // Fonction pour ouvrir ou fermer le menu burger
    const openOrCloseButton = (e) => {
        e.preventDefault()
        if (isOpen) {
            closeMenu()
        } else {
            openMenu()
        }
    }


    // Utilisation du hook spécifique pour gérer 
    // les clics en dehors du menu burger
    useClickOutside([burgerMenuRef, burgerButtonRef], (e) => {
        closeMenu()
    })


    // Utilisation du hook pour fermer le menu 
    // lorsque la touche "Escape" est pressée
    useEscapeKey(() => {
        if (isOpen) {
            closeMenu()
        }
    })


    // Ouvrir le menu
    const openMenu = () => {
        setIsOpen(true)
        setBurgerMenuFade("fade-in")
    }


    // Fermer le menu
    const closeMenu = () => {
        setBurgerMenuFade("fade-out")
        setTimeout(() => {
            setIsOpen(false)
            setOpenWikiLinks('none')
            setWikiButtonActive('')
        }, 300);
    }


  return (
    <>
        <div className='hamburger-menu-icon' 
        ref={burgerButtonRef}
        onClick={(e) => openOrCloseButton(e)} 
        onKeyDown={(e) => e.key === 'Enter' && openOrCloseButton(e)}
        tabIndex="0"
        />
        {isOpen ? (
            <div className={`burger-menu ${burgerMenuFade}`}
            ref={burgerMenuRef}
            >
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-display-none'
                    : 'navlink-display-flex'
                    } to="/" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Accueil</NavLink>
                <span 
                tabIndex="0"
                className={`span-wiki-menu${wikiButtonActive}`} 
                onKeyDown={(e) => e.key === 'Enter' && openWikiLinksFunction(e)}
                onClick={(e) => openWikiLinksFunction(e)}
                >Documentation</span>
                    <div style={{ display: openWikiLinks }} className='wiki-menu'>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}
                            >Personnages</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Créatures</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Droïds</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Lieux</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Organisations</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Espèces</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive
                            ? 'navlink-display-none'
                            : 'navlink-display-flex'
                            } to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Véhicules</NavLink>
                    </div>
                
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-display-none'
                    : 'navlink-display-flex'
                    } to="/forum" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Forum</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-display-none'
                    : 'navlink-display-flex'
                    } to="/movies" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Vidéothèque</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-display-none'
                    : 'navlink-display-flex'
                    } to="/shopping/market" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Boutique de Wattoo</NavLink>
            </div>
        ) : null
        }
    </>
    
  )
}
