import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [showProductsSubMenu, setShowProductsSubMenu] = useState(false);

    const toggleProductsSubMenu = () => {
        setShowProductsSubMenu(!showProductsSubMenu);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/admin">Manage Admin</a></li>
                <li><a href="#manage-user">Manage User</a></li>

                <li className="submenu">
                    <a href="#manage-product" onClick={toggleProductsSubMenu}>
                        Manage Product
                    </a>
                    {showProductsSubMenu && (
                        <ul className="submenu-items">
                            <li><a href="#category">Category</a></li>
                            <li><a href="#attribute">Attribute</a></li>
                        </ul>
                    )}
                </li>

                <li><a href="#manage-order">Manage Order</a></li>
                <li><a href="#report">Report</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
