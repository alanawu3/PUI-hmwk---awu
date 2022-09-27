import Navbar from './navbar'
import ProductHook from './product'
import React, { useState, useEffect } from 'react'; // what does this line do

function App() {
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [numItems, setNumItems] = useState(0);
  const [newRoll, setNewRoll] = useState("") //type, glaze, pack, price of newly added roll
  const [popup, setShowPopup] = useState(false); //show or not show popup rn

  useEffect(() => {
    setTotalPrice(0.00);
    setNumItems(0);
    setNewRoll("");
    setShowPopup(false);
  }, [])

  return (
    <div>
      <Navbar numItems = {numItems} totalPrice = {totalPrice} newRoll = {newRoll} popup = {popup}/>
      <div className="products">
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Original Cinnamon Roll" setNumItems={setNumItems} setTotalPrice = {setTotalPrice} setNewRoll={setNewRoll} basePrice={2.49} imgSrc={process.env.PUBLIC_URL + "/assets/original-cinnamon-roll.jpg"} alt="original cinnamon roll"/>
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Apple Cinnamon Roll" setNumItems={setNumItems} setTotalPrice={setTotalPrice} setNewRoll={setNewRoll} basePrice={3.49} imgSrc={process.env.PUBLIC_URL + "/assets/apple-cinnamon-roll.jpg"} alt="apple cinnamon roll"/>
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Raisin Cinnamon Roll" setNumItems={setNumItems} setTotalPrice={setTotalPrice} setNewRoll={setNewRoll} basePrice={2.99} imgSrc={process.env.PUBLIC_URL + "/assets/raisin-cinnamon-roll.jpg"} alt="raisin cinnamon roll"/>
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Walnut Cinnamon Roll" setNumItems={setNumItems} setTotalPrice={setTotalPrice} setNewRoll={setNewRoll} basePrice={3.49} imgSrc={process.env.PUBLIC_URL + "/assets/walnut-cinnamon-roll.jpg"} alt="walnut cinnamon roll"/>
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Double Chocolate Cinnamon Roll" setNumItems={setNumItems} setTotalPrice={setTotalPrice} setNewRoll={setNewRoll} basePrice={3.99} imgSrc={process.env.PUBLIC_URL + "/assets/double-chocolate-cinnamon-roll.jpg"} alt="double chocolate cinnamon roll"/>
        <ProductHook newRoll={newRoll} setShowPopup={setShowPopup} name="Strawberry Cinnamon Roll" setNumItems={setNumItems} setTotalPrice={setTotalPrice} setNewRoll={setNewRoll} basePrice={3.99} imgSrc={process.env.PUBLIC_URL + "/assets/strawberry-cinnamon-roll.jpg"} alt="strawberyy cinnamon roll"/>
      </div>
    </div>
  );
}

export default App;