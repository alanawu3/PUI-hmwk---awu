import Navbar from './navbar'
import ProductHook from './product'
import React, { useState, useEffect } from 'react';

function App() {
  const [updateApp, setUpdateApp] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [numItems, setNumItems] = useState(0);
  const [newRoll, setNewRoll] = useState(""); //type, glaze, pack, price of newly added roll
  const [popup, setShowPopup] = useState(false); //show or not show popup rn
  const [rolls, setRolls] = useState([]); //array of all rolls? or those currenlty being shown...?
  const [cartRolls, setCartRolls] = useState([]);
  const [filterCategory, setFilterCategory] = useState(''); //what was just put into the search bar?
  const [sortCategory, setSortCategory] = useState(null); //no sort category, by name, or by price
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setTotalPrice(0.00);
    setNumItems(0);
    setNewRoll("");
    setShowPopup(false);
    setRolls([
      {
        name: "Apple Cinnamon Roll",
        basePrice: "3.49",
        imgSrc: "/assets/apple-cinnamon-roll.jpg"
      },
      {
        name: "Double Chocolate Cinnamon Roll",
        basePrice: "3.99",
        imgSrc: "/assets/double-chocolate-cinnamon-roll.jpg"
      },
      {
        name: "Original Cinnamon Roll",
        basePrice: "2.49",
        imgSrc: "/assets/original-cinnamon-roll.jpg"
      },
      {
        name: "Raisin Cinnamon Roll",
        basePrice: "2.99",
        imgSrc: "/assets/raisin-cinnamon-roll.jpg"
      },
      {
        name: "Strawberry Cinnamon Roll",
        basePrice: "3.99",
        imgSrc: "/assets/strawberry-cinnamon-roll.jpg"
      },
      {
        name: "Walnut Cinnamon Roll",
        basePrice: "3.49",
        imgSrc: "/assets/walnut-cinnamon-roll.jpg"
      }
    ])
  }, [])

  useEffect(() => { //when sortCategory (name or base price) is updated, the order of the rolls displayed is updated
    updateRollsBySort(sortCategory);
  }, [sortCategory])

  const updateRollsBySort = (category) => { //sorts the rolls by category
    if (category != null) {
        if (category == 'base-price') {
          category = 'basePrice';
        }
        const sortedRolls = [...rolls].sort((a, b) => a[category] > b[category] ? 1: -1);
        setRolls(sortedRolls);
    }
  }

  let noMatch = false; //keeps track of if any rolls matched the search query
  const checkNoMatch = (noMatch) => {
    if (noMatch) {
      return <h3>No match!</h3> //if no rolls matched search query, print No Match!
    }
  }

  return (
    <div>
      <Navbar updateApp={updateApp} setUpdateApp={setUpdateApp} cartRolls = {cartRolls} showCart = {showCart} setShowCart={setShowCart} numItems = {numItems} setTotalPrice={setTotalPrice} totalPrice = {totalPrice} newRoll = {newRoll} popup = {popup}  setFilterCategory = {setFilterCategory} setSortCategory = {setSortCategory}/>
      <div className="products">
        {noMatch = true}
        {rolls.map(
            (roll, indx) =>
            {
              if ((filterCategory == null) ||
              (roll.name.includes(filterCategory))) //roll name contains this search word
              {
                noMatch = false;
                return <ProductHook
                  key={indx} //unique identifier for each notecard element, include for map fxn
                  rollIndex={indx} //which index roll from array
                  imgSrc={process.env.PUBLIC_URL + roll.imgSrc}
                  alt={roll.name}
                  name={roll.name}
                  basePrice={Number(roll.basePrice)}
                  newRoll={newRoll}
                  setShowPopup={setShowPopup}
                  setNumItems={setNumItems}
                  setTotalPrice={setTotalPrice}
                  setNewRoll={setNewRoll}
                  setFilterCategory={setFilterCategory}
                  filterCategory={filterCategory}
                  setSortCategory={setSortCategory}
                  cartRolls={cartRolls}
                  />
                  } 
            })
          }
          {checkNoMatch(noMatch)} {/*checks if any rolls matched search query, if not, print No Match!*/}
      </div>
    </div>
  );
}

export default App;