import React, { useState } from 'react';

function CartComponent(props) {
    const hrStyle = {
        background: 'brown',
        height: '8px',
        shade: 'noshade',
        width: '1200px'
    }

    const imgSrcs = {
        'Apple Cinnamon Roll': "/assets/apple-cinnamon-roll.jpg",
        'Double Chocolate Cinnamon Roll': "/assets/double-chocolate-cinnamon-roll.jpg",
        'Original Cinnamon Roll': "/assets/original-cinnamon-roll.jpg",
        'Raisin Cinnamon Roll': "/assets/raisin-cinnamon-roll.jpg",
        'Strawberry Cinnamon Roll': "/assets/strawberry-cinnamon-roll.jpg",
        'Walnut Cinnamon Roll': "/assets/walnut-cinnamon-roll.jpg"
    }

    //entire cart styling
    const cartStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'spaceBetween',
        width: 'auto',
        alignItems: 'left',
    }

    //checks each roll if it's the one we want to delete, if so, remove it from cartRolls array
    const deleteRoll = (deleteRollID, price) => {
        let i = 0;
        while (i < props.cartRolls.length) {
            if (props.cartRolls[i].rollID == deleteRollID) {
                props.cartRolls.splice(i, 1);
                continue;
            }
            i += 1;
        }
        props.setUpdateApp(!props.updateApp);
        props.setTotalPrice(props.totalPrice - price);
    }

    //if there are items in the cart, display the following
    return (props.cartRolls.length > 0) ? (
    <div>
        <hr style={hrStyle}></hr>
        <p style={{fontSize: '15px', display: 'inline', marginLeft: '25px'}}>Shopping Cart ({props.cartRolls.length} items)</p>
        <p style={{fontSize: '15px', display: 'inline', marginLeft:'60%'}}>Total: ${Number(props.totalPrice).toFixed(2)}</p>
        <div style={cartStyle}>
        {
        props.cartRolls.map(
            (roll) =>
            {
                const pStyle = {
                    fontSize: '10px',
                    textAlign: 'center'
                }

                const rollStyle = {
                    margin: '20px'
                }

                const imgStyle = {
                    width: '110px',
                    border: '3px solid black'
                }
                
                return <div style={rollStyle}>
                    <div>
                    <img style={imgStyle} src={process.env.PUBLIC_URL + imgSrcs[roll.type]} alt={roll.alt} width="50px"/>
                    <p style={pStyle}>{roll.type}</p>
                    <p style={pStyle}>Glaze: {roll.glaze}</p>
                    <p style={pStyle}>Pack Size: {roll.pack}</p>
                    <p style={pStyle}><b>$ {roll.price}</b></p>
                    <p onClick={() => deleteRoll(roll.rollID, roll.price)} style={pStyle}><u>Remove</u></p>  
                    </div>

                </div>
            })}
        </div>
    </div>
    //if nothing in cartRolls array, display the following
    ) : <h3 style={{textAlign: 'center', margin: '100px'}}>The cart is Empty!</h3>
  }

  export default CartComponent;