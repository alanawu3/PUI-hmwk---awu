import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
    <div>
        <div className="nav-bar">
            <img id="logo" src="assets/logo-01.svg" alt="Bun Bun Logo" width="30%"/>
            <div className="nav-right">
                <div className="menu-bar">
                <div className="page-title">
                    <h2 className="nav-link"> PRODUCTS</h2>
                </div>
            
                <div className="page-title">
                    <h2 className="nav-link"> CART</h2>
                </div>
                </div>
                <hr/>
                <h1>Our hand-made cinnamon rolls</h1>
            </div>
        </div>
    </div>
    )

  }
}


export default Navbar;