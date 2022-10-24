import './navbar.css';
import React, { useState } from 'react';
import CartComponent from '../cart/cartComponent';


function NavHook(props) {
  const [searchText, setSearchText] = useState('');

  return props.showCart ? ( //if we need to show the cart, display the following
    <div className="nav-column">
      <div className="nav-bar">
      <img id="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="Bun Bun Logo" width="30%"/>        
      <div className="nav-right">
        <div className="menu-bar">
          <div className="page-title">
            <h2 className="nav-link"> PRODUCTS</h2>
          </div>
    
          <div className="page-title">
            <h2 onClick={() => props.setShowCart(!props.showCart)} className="nav-link"> CART</h2>
          </div>
        </div>
        <hr/>
        <h1>Our hand-made cinnamon rolls</h1>
      </div>
    </div>

    <CartComponent updateApp={props.updateApp} setUpdateApp={props.setUpdateApp}
    setTotalPrice={props.setTotalPrice} totalPrice={props.totalPrice} cartRolls={props.cartRolls}/>

    <div className="filter-features" style = {{display: 'inline-flex', marginLeft: '8%'}}>
      <form action="/action_page.php">
        <input onChange={(event) => setSearchText(event.target.value)} id="search" style={{width: "350px"}} type="text" placeholder="Search.." name="search"/>
        <button onClick={() => props.setFilterCategory(searchText)} style={{marginRight: "30px"}} type="button">Search</button>
      </form>
      <p style={{margin: "0px"}}> Sort By:</p>
      <select onChange= {(event) => props.setSortCategory(event.target.value)} style={{marginLeft: '30px'}}>
        <option value="name">Name</option>
        <option value="base-price">Base Price</option>
      </select>
    </div>
  </div>) : ( <div className="nav-column"> {/* if we're not displaying the cart, show this section*/}
      <div className="nav-bar">
      <img id="logo" src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} alt="Bun Bun Logo" width="30%"/>        
      <div className="nav-right">
        <div className="menu-bar">
          <div className="page-title">
            <h2 className="nav-link"> PRODUCTS</h2>
          </div>
    
          <div className="page-title">
            <h2 onClick={() => props.setShowCart(!props.showCart)} className="nav-link"> CART</h2>
          </div>
        </div>
        <hr/>
        <h1>Our hand-made cinnamon rolls</h1>
      </div>
    </div>
    <div className="filter-features" style = {{display: 'inline-flex', marginLeft: '8%'}}>
      <form action="/action_page.php">
        <input onChange={(event) => setSearchText(event.target.value)} id="search" style={{width: "350px"}} type="text" placeholder="Search.." name="search"/>
        <button onClick={() => props.setFilterCategory(searchText)} style={{marginRight: "30px"}} type="button">Search</button>
      </form>
      <p style={{margin: "0px"}}> Sort By:</p>
      <select onChange= {(event) => props.setSortCategory(event.target.value)} style={{marginLeft: '30px'}}>
        <option value="name">Name</option>
        <option value="base-price">Base Price</option>
      </select>
    </div>
  </div>
  )
}

export default NavHook;