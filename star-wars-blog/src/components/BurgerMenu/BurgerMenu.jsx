import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../../redux/slices/dozenSlice'
import './BurgerMenu.scss'
import ClickAwayListener from 'react-click-away-listener'



export default function BurgerMenu() {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [openWikiLinks, setOpenWikiLinks] = useState('none')
    const [wikiButtonActive, setWikiButtonActive] = useState('')


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


    const openOrCloseButton = (e) => {
        e.preventDefault()
        if (isOpen) {
            setIsOpen(false)
            setOpenWikiLinks('none')
            setWikiButtonActive('')
        } else {
            setIsOpen(true)
        }
    }

    const handleClickAway = (e) => {
        e.preventDefault()
        setIsOpen(false)
        setOpenWikiLinks('none')
        setWikiButtonActive('')
    }

  return (
    <>
        <div className='hamburger-menu-icon' onClick={(e) => openOrCloseButton(e)} />
        {isOpen ? (
            <ClickAwayListener onClickAway={(e) => handleClickAway(e)}>
                <div className='burger-menu'>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>Accueil</NavLink>
                    <span 
                    className={`span-wiki-menu${wikiButtonActive}`} 
                    onClick={(e) => openWikiLinksFunction(e)}
                    >documentation</span>
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
                        } to="/shopping" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false); setOpenWikiLinks('none'); setWikiButtonActive('')}}>E-boutique</NavLink>
                </div>
            </ClickAwayListener>
        ) : null
        }
    </>
    
  )
}
