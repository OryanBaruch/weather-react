// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation()
{

    return (
        <div className="navigation-container">
            <NavLink to="/" className="nav-link" >Home</NavLink>
            <NavLink to="/favorites" className="nav-link" >Favorites</NavLink>
        </div>
    )
}

export default Navigation;