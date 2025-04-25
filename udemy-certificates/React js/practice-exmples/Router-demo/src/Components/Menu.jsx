import React from 'react'
import {NavLink} from "react-router-dom"

const Menu = () => {
  return (
    <nav className='navWrapper'>
        <ul className='navigateWrapper'>
        <li>
            <NavLink  to="/"> HOME</NavLink>
        </li>
        <li>
            <NavLink  to="/user"> USERS</NavLink>
        </li>
        </ul>

    </nav>
  )
}

export default Menu