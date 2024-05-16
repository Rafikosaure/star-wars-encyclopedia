import React from 'react'
import '../styles/Header.css'
import Logo from '../assets/images/logo.webp'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../redux/slices/dozenSlice'


export default function Header() {

  // Cette objet "dispatch" permet d'appeler la fonction
  // du store redux servant à réinitialiser à 1 la dizaine 
  // d'articles affichés lors d'un clic sur une NavLink:
  const dispatch = useDispatch()

  return (
    <div className='header'>
      <div className='navbar'>
        <NavLink 
          to="/"
          onClick={(e) => dispatch(reinitializeDozen())}
          className={({ isActive }) =>
            isActive
              ? 'link-logo link-logo-disabled'
              : 'link-logo link-logo-enabled'
              }>
              <img src={Logo} alt="logo" />
        </NavLink>
        <div className='title-and-links'>
          <h1>Star Wars Encyclopedia</h1>
          <nav>
            <NavLink to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={(e) => dispatch(reinitializeDozen())}>personnages</NavLink>
            <NavLink to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={(e) => dispatch(reinitializeDozen())}>créatures</NavLink>
            <NavLink to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={(e) => dispatch(reinitializeDozen())}>droïds</NavLink>
            <NavLink to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={(e) => dispatch(reinitializeDozen())}>lieux</NavLink>
            <NavLink to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={(e) => dispatch(reinitializeDozen())}>organisations</NavLink>
            <NavLink to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={(e) => dispatch(reinitializeDozen())}>espèces</NavLink>
            <NavLink to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={(e) => dispatch(reinitializeDozen())}>véhicules</NavLink>
          </nav>
        </div>
        
      </div>
    </div>
  )
}
