import './WikiNavbar.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reinitializeDozen } from '../../redux/slices/dozenSlice'


function WikiNavbar() {

    const dispatch = useDispatch()

    return (
        <div className='wikinavbar-wrapper'>
            <nav className='wikinavbar'>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/f6def03b-7818-4951-9d8a-afbe17aa205b" onClick={() => dispatch(reinitializeDozen())}>personnages</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/645e063c-af40-4576-b674-d44be61b0773" onClick={() => dispatch(reinitializeDozen())}>créatures</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/2857b650-12ec-4671-86a8-0d5c5db0518e" onClick={() => dispatch(reinitializeDozen())}>droïds</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/a5ebca47-0ce4-452c-84c2-2d1c23309458" onClick={() => dispatch(reinitializeDozen())}>lieux</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/13043736-7457-4a22-9218-4f9134f61b0c" onClick={() => dispatch(reinitializeDozen())}>organisations</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/d4ac0725-f089-42c4-a76b-817764c5e0ab" onClick={() => dispatch(reinitializeDozen())}>espèces</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive
                    ? 'navlink-active'
                    : 'navlink-inactive'
                    } to="/category/1812c326-e3a3-4a84-9a69-4dd64f5a298d" onClick={() => dispatch(reinitializeDozen())}>véhicules</NavLink>
            </nav>
        </div>
    )
}

export default WikiNavbar
