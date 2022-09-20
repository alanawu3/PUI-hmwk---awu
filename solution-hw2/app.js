let cartItems = [];//store added-to-cart roll objects in here
let cartTotals = {//track #items added to cart & total price
    items: 0,
    priceTotal: 0
}
let currRolls = []; //holds instances of each roll in its current state on the product page

const glazeOptions = {//price adaptation for each glaze type
    'Keep Original': 0,
    'Sugar Milk': 0,
    'Vanilla Milk': 0.5,
    'Double Chocolate': 0.5
}

const packSizeOptions = {//price adaptation for pack size changes
    1: 1,
    3: 3,
    6: 5,
    12: 10
}

const basePrice = [2.49, 3.49, 2.99, 3.49, 3.99, 3.99]; //starting price for each roll

class Roll {
    constructor(rollType, price, glazing, packSize){
        this.rollType = rollType;
        this.price = price;
        this.glazing = glazing;
        this.packSize = packSize;

        currRolls.push(this); //adds new roll product to existing product choices
    }
}

function callPopup(btn, rollNum) { //updates item total, price total, most recent cart addition info, and displays popup
    selectedRoll = currRolls[rollNum];
    let newCartRoll = JSON.parse(JSON.stringify(selectedRoll)); //makes copy of this roll object
    cartItems.push(newCartRoll); //adds to array of rolls in cart
    cartTotals['items'] += 1;
    cartTotals['priceTotal'] += selectedRoll['price']; //price of new roll is added to existing cart price total

    if (cartTotals['items'] == 1) {
        document.getElementById('cart-items').innerHTML = cartTotals['items'] + ' item';
    }
    else {
        document.getElementById('cart-items').innerHTML = cartTotals['items'] + ' items';
    }
    let priceTotal = cartTotals['priceTotal'].toFixed(2);
    document.getElementById('price-total').innerHTML = "$ " + priceTotal;

    let popup = document.getElementById("popup");
    document.getElementById('new-item').innerHTML = cartItems.slice(-1)[0]['rollType'] + ' Cinnamon Roll';
    document.getElementById('new-item-glaze').innerHTML = cartItems.slice(-1)[0]['glazing'] + ' Glazing';
    document.getElementById('new-item-pack').innerHTML = 'Pack of ' + cartItems.slice(-1)[0]['packSize'];
    document.getElementById('new-item-price').innerHTML = 'Price: ' + (cartItems.slice(-1)[0]['price']).toFixed(2);

    popup.classList.add("show"); //turns on visibility for popup
}

function hidePopup() {//turns off popup visibility
    let popup = document.getElementById("popup");
    popup.classList.remove("show");
}

function popupFxns(btn, rollNum) {//calls popup & timer fxn when add-to-cart is clicked
    callPopup(btn, rollNum);
    setTimeout(function () {
        hidePopup();
    }, 3000);
}

function updatePackSize(element,rollNum, size) {//updates price, btn displays, and roll object when packSize is changed
    let currRoll = currRolls[rollNum];
    currRoll.packSize = size;
    let buttons = document.querySelectorAll('.pack-size > button');
    for (let i = 0; i < 24; i += 1)
    {
        buttons[i].classList = 'pack-size-btn';
    }
    element.classList.add('pack-size-selected-btn');
    currRoll.price = (basePrice[rollNum] + glazeOptions[currRoll.glazing]) * currRoll.packSize;
    let rollID =  "price-" + String(rollNum);
    document.getElementById(rollID).innerHTML = '$ ' + currRoll.price.toFixed(2);
  }

function updateGlazeOption (rollNum) { //updates price & roll object
    let glazeNum = document.getElementById(rollNum + '-glaze').value;
    let currRoll = currRolls[rollNum]; //finds which roll type is currently being altered
    let glazeType = Object.keys(glazeOptions)[glazeNum];
    currRoll.glazing = glazeType;
    currRoll.price = (basePrice[rollNum] + glazeOptions[glazeType]) * currRoll.packSize;
    let rollID =  "price-" + String(rollNum);
    document.getElementById(rollID).innerHTML = '$ ' + currRoll.price;
}

//roll products displayed on the page
let originalRoll = new Roll(
    'Original',
    2.49,
    'Keep Original',
    1
    )

let appleRoll = new Roll(
    'Apple',
    3.49,
    'Keep Original',
    1
    )

let raisinRoll = new Roll(
    'Raisin',
    2.99,
    'Keep Original',
    1
    )

let walnutRoll = new Roll(
    'Walnut',
    3.49,
    'Keep Original',
    1
    )

let chocolateRoll = new Roll(
    'Double Chocolate',
    3.99,
    'Keep Original',
    1
    )

let strawberryRoll = new Roll(
    'Strawberry',
    3.99,
    'Keep Original',
    1
    )