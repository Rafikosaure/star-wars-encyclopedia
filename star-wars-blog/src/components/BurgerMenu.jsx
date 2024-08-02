import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../redux/slices/dozenSlice'
import '../styles/BurgerMenu.scss'
import Menu from '../assets/images/menu_hamburger.webp'
import ClickAwayListener from 'react-click-away-listener'



export default function BurgerMenu() {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)


    const openOrCloseButton = (e) => {
        e.preventDefault()
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    const handleClickAway = (e) => {
        e.preventDefault()
        setIsOpen(false)
    }

  return (
    <>
        <div className='hamburger-menu-icon' onClick={(e) => openOrCloseButton(e)}>
            <img src={Menu} alt="menu hamburger" />
        </div>
        {isOpen ? (
            <ClickAwayListener onClickAway={(e) => handleClickAway(e)}>
                <div className='burger-menu'>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Accueil</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Personnages</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Créatures</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Droïds</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Lieux</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Organisations</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Espèces</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Véhicules</NavLink>
                    <NavLink className={({ isActive }) =>
                        isActive
                        ? 'navlink-display-none'
                        : 'navlink-display-flex'
                        } to="/forum" onClick={() => {dispatch(reinitializeDozen()); setIsOpen(false)}}>Forum</NavLink>
                </div>
            </ClickAwayListener>
        ) : null
        }
    </>
    
  )
}
