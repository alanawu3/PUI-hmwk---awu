import React, { useState, prevState, useEffect } from 'react';
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


    const updateGlazeAndPrice = (props, event) => {
      setGlazePrice(Number(event.target.value)); //additional cost of X glaze
      setGlazeType(glazeTypes[event.target.value]);
      setRollPrice(Number(((props.basePrice + Number(event.target.value)) * packSize).toFixed(2)));
    } //how do I make sure setPackSize finishes running before setRollPrice starts?


    const updatePackSizeAndPrice = (props, event) => {
      const currBtn = event.target;
      const allBtns = event.target.parentElement.children;
      for (let i = 0; i < 4; i += 1) {
        allBtns[i].classList = 'pack-size-btn';
      }
      currBtn.classList.add('pack-size-selected-btn');
      setPackSize(Number(currBtn.value));
    }

    useEffect(() => { //setRollPrice is called 
      setRollPrice(Number(((props.basePrice + glazePrice) * packSize).toFixed(2)));
    }, [packSize])

    const addToCart = (props) => {
      props.setNumItems((prevNum) => prevNum + 1);
      props.setTotalPrice((prevPrice) => (Number(prevPrice) + rollPrice).toFixed(2));
      props.setNewRoll({
          type: props.name,
          glaze: glazeType,
          pack: packSizes[packSize],
          price: rollPrice
      })
      props.setShowPopup(true); //show the popup now
    }

    const hidePopup = () => {
      props.setShowPopup(false); //no longer show popup
    }

    const addToCartFxns = (props)=> {
      addToCart(props);
      setTimeout(function () {
        hidePopup();
      }, 3000);
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
              <button id="1" value="1" className="pack-size-selected-btn pack-size-btn" onClick={(event) => updatePackSizeAndPrice(props, event)}>1</button>
              <button id="3" value="3" className="pack-size-btn" onClick={(event) => updatePackSizeAndPrice(props, event)}>3</button>
              <button id="5" value="5" className="pack-size-btn" onClick={(event) => updatePackSizeAndPrice(props, event)}>6</button>
              <button id="10" value="10" className="pack-size-btn" onClick={(event) => updatePackSizeAndPrice(props, event)}>12</button>
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