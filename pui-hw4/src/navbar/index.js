//import React, { useState } from 'react';
import './navbar.css';


function NavHook(props) { //pass in props so we can see which roll we're currently editing
    //should I use states instead of props here? How do you access the state of a different component?
    return (
        <div className="nav-bar">
        <img id="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="Bun Bun Logo" width="30%"/>
        <div className="nav-right">
          <div className="menu-bar">
            <div className="page-title">
              <h2 className="nav-link"> PRODUCTS</h2>
            </div>
      
            <div className="page-title">
              <h2 className="nav-link"> CART</h2>
            </div>
          </div>
  
          <div className="cart">
            <p id ="cart-items" className="cart-text">{props.numItems} items</p>
            <p id="price-total" className="cart-text">Total: ${props.totalPrice}</p>
          </div>
  
          <div id="popup" className={props.popup.toString()}>
            <p id="added-to-cart" className="popup-text">Added to Cart:</p>
            <p id="new-item" className="popup-text">{props.newRoll['type']}</p>
            <p id="new-item-glaze" className="popup-text">{props.newRoll['glaze']}</p>
            <p id="new-item-pack" className="popup-text">Pack of {props.newRoll['pack']}</p>
            <p id="new-item-price" className="popup-text">Price: ${props.newRoll['price']}</p>
          </div>

          <hr/>
          <h1>Our hand-made cinnamon rolls</h1>
        </div>
      </div>
    )
}

export default NavHook;