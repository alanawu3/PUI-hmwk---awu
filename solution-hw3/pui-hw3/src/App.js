import Navbar from './navbar'
import Product from './product'

function App() {
  return (
    <div>
      <Navbar />
      <div className="products">
        <Product name="Original Cinnamon Roll" price="2.49" imgSrc="assets/original-cinnamon-roll.jpg"/>
        <Product name="Apple Cinnamon Roll" price="3.49" imgSrc="assets/apple-cinnamon-roll.jpg"/>
        <Product name="Raisin Cinnamon Roll" price="2.99" imgSrc="assets/raisin-cinnamon-roll.jpg"/>
        <Product name="Walnut Cinnamon Roll" price="3.49" imgSrc="assets/walnut-cinnamon-roll.jpg"/>
        <Product name="Double Chocolate Cinnamon Roll" price="3.99" imgSrc="assets/double-chocolate-cinnamon-roll.jpg"/>
        <Product name="Strawberry Cinnamon Roll" price="3.99" imgSrc="assets/strawberry-cinnamon-roll.jpg"/>
      </div>
    </div>
  );
}

export default App;
