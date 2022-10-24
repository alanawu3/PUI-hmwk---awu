import React, { useState, useEffect } from 'react';
import './product.css';

const glazeTypes = {
    0: 'Keep Original',
    1: 'Sugar Milk',
    2: 'Vanilla Milk',
    3: 'Double Chocolate'
}

const packSizes = {
  1: 1,
  3: 3,
  5: 6,
  10: 12
}

function ProductHook(props) { //pass in props so we can see which roll we're currently editing
    const [packSize, setPackSize] = useState(1); //FIRST INSTANCE OF ERROR IS HERE
    const [glazeType, setGlazeType] = useState('Keep Original');
    const [glazePrice, setGlazePrice] = useState(0);
    const [rollPrice, setRollPrice] = useState(props.basePrice);
    const [selectedBtn, setSelectedBtn] = useState('1');


    const updateGlazeAndPrice = (props, event) => {
      setGlazePrice(Number(event.target.value)); //additional cost of X glaze
      setGlazeType(glazeTypes[event.target.value]);
      setRollPrice(Number(((props.basePrice + Number(event.target.value)) * packSize).toFixed(2)));
    }

    const updatePackSizeAndPrice = (props, event) => {
      const currBtn = event.target;
      setSelectedBtn(event.target.value);
      const allBtns = event.target.parentElement.children;
      for (let i = 0; i < 4; i += 1) {
        allBtns[i].classList = 'pack-size-btn';
      }
      currBtn.classList.add('pack-size-selected-btn');
      setPackSize(Number(currBtn.value));
    }

    useEffect(() => { //when glazePrice, basePrice, or packSize are changed, rollPrice is updated
      setRollPrice(Number(((props.basePrice + glazePrice) * packSize).toFixed(2)));
    }, [glazePrice, props.basePrice, packSize])

    const addToCart = (props) => {
      props.setNumItems((prevNum) => prevNum + 1);
      props.setTotalPrice((prevPrice) => (Number(prevPrice) + rollPrice).toFixed(2));
      const newRoll = {
        rollID: props.cartRolls.length,
        type: props.name,
        glaze: glazeType,
        pack: packSizes[packSize],
        price: rollPrice
      }
      props.cartRolls.push(newRoll); //adds new roll to cartRolls array
      localStorage.clear();
      localStorage.setItem('cartRolls', JSON.stringify(props.cartRolls));
    }

    const addToCartFxns = (props)=> {
      addToCart(props);
    }

    const selectedStyle = {
      display: 'flex',
      backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
      borderWidth: '3px',
      borderColor: 'black',
      height: '35px'
    }

    const unselectedStyle = {
      display: 'flex',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
      borderWidth: '3px',
      borderColor: 'black',
      height: '35px'
    }

    return (
        <div className="product"> 
        <img className="product-img" src={props.imgSrc} alt={props.alt} width="300px"/>

        <div className="product-label">
          <h2>{props.name}</h2>
        </div>

        <div className="product-choices-2rows"> 
          <div className="product-choice-row">
            <div className="product-choice-row-text">
              <p>Glazing:</p>
            </div>
            <select className="glazing-option-btn" onChange= {(event) => updateGlazeAndPrice(props, event)}> 
              <option value = {0} className="option">Keep Original</option>
              <option value = {0} className="option">Sugar Milk</option>
              <option value = {0.5} className="option">Vanilla Milk</option>
              <option value = {0.5} className="option">Double Chocolate</option>
            </select>
          </div>

          <div className="product-choice-row">
            <div className="product-choice-row-text">
            <p> Pack Size:</p>
            </div>

            <div className="pack-size">
              <button id="1" style= {selectedBtn == '1' ? selectedStyle : unselectedStyle} value="1" onClick={(event) => updatePackSizeAndPrice(props, event)}>1</button>
              <button id="3" value="3" style= {selectedBtn == '3' ? selectedStyle : unselectedStyle} onClick={(event) => updatePackSizeAndPrice(props, event)}>3</button>
              <button id="5" value="5" style= {selectedBtn == '5' ? selectedStyle : unselectedStyle} onClick={(event) => updatePackSizeAndPrice(props, event)}>6</button>
              <button id="10" value="10" style= {selectedBtn == '10' ? selectedStyle : unselectedStyle} onClick={(event) => updatePackSizeAndPrice(props, event)}>12</button>
            </div>
          </div>
        </div>

        <div className="product-choice-last-row">
          <h3 id="price-0">$ {rollPrice}</h3>
          <button className="add-to-cart-btn">
            <h2 onClick={() => addToCartFxns(props)}>Add to Cart</h2>
          </button>
        </div>
      </div>
    )
}

export default ProductHook;