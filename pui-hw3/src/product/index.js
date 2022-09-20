import React, { Component } from 'react';
import './product.css';

class Product extends Component {
  render() {
    return (
    <div>
        <div className="products">
        <div className="product">
            <img className="product-img" src={this.props.imgSrc} alt="original cinnamon roll" width="300px"/>

            <div className="product-label">
            <h2> {this.props.name} </h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>${this.props.price}</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div>

        {/* <div className="product">
            <img className="product-img" src="assets/apple-cinnamon-roll.jpg" alt="original cinnamon roll" width="300px"/>
            <div className="product-label">
            <h2> Apple Cinnamon Roll</h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>$3.49</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div>

        <div className="product">
            <img className="product-img" src="assets/raisin-cinnamon-roll.jpg" alt="original cinnamon roll" width="300px"/>

            <div className="product-label">
            <h2> Raisin Cinnamon Roll</h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>$2.99</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div>

        <div className="product">
            <img className="product-img" src="assets/walnut-cinnamon-roll.jpg" alt="original cinnamon roll" width="300px"/>

            <div className="product-label">
            <h2> Walnut Cinnamon Roll</h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>$3.49</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div>

        <div className="product">
            <img className="product-img" src="assets/double-chocolate-cinnamon-roll.jpg" alt="original cinnamon roll" width="300px"/>

            <div className="product-label">
            <h2> Double Chocolate Cinnamon Roll</h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>$3.99</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div>

        <div className="product">
            <img className="product-img" src="assets/strawberry-cinnamon-roll.jpg" alt="original cinnamon roll" width="300px"/>

            <div className="product-label">
            <h2> Strawberry Cinnamon Roll</h2>
            </div>

            <div className="product-choices-2rows">
            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p>Glazing:</p>
                </div>

                <div className="keep-original-btn">
                <p> Keep Original</p>
                <div className="triangle-down"></div>
                </div>
            </div>

            <div className="product-choice-row">
                <div className="product-choice-row-text">
                <p> Pack Size:</p>
                </div>

                <div className="pack-size">
                <div className="pack-size-selected-btn">
                    <p>1</p>
                </div>

                <div className="pack-size-btn">
                    <p>3</p>
                </div>

                <div className="pack-size-btn">
                    <p>6</p>
                </div>

                <div className="pack-size-btn">
                    <p>12</p>
                </div>
                </div>
            </div>
            </div>

            <div className="product-choice-last-row">
            <h3>$3.99</h3>
            <div className="add-to-cart-btn">
                <h2>Add to Cart</h2>
            </div>
            </div>
        </div> */}

        </div>
    </div>
    )

  }
}


export default Product;