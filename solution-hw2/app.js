let cartItems = [];//store added-to-cart roll objects in here
let cartTotals = {
    items: 0,
    priceTotal: 0
}
let currRolls = []; //holds instances of each roll in its current state on the product page

const glazeOptions = {
    'Keep Original': 0,
    'Sugar Milk': 0,
    'Vanilla Milk': 0.5,
    'Double Chocolate': 0.5
}

const packSizeOptions = {
    1: 1,
    3: 3,
    6: 5,
    12: 10
}

const basePrice = [2.49, 3.49, 2.99, 3.49, 3.99, 3.99];

class Roll {
    constructor(rollType, price, glazing, packSize){
        this.rollType = rollType;
        this.price = price;
        this.glazing = glazing;
        this.packSize = packSize;

        currRolls.push(this);
    }
}

function callPopup(btn, rollNum) {
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
    console.log(priceTotal);
    document.getElementById('price-total').innerHTML = "$ " + priceTotal;

    let popup = document.getElementById("popup");
    document.getElementById('new-item').innerHTML = cartItems.slice(-1)[0]['rollType'] + ' Cinnamon Roll';
    document.getElementById('new-item-glaze').innerHTML = cartItems.slice(-1)[0]['glazing'] + ' Glazing';
    document.getElementById('new-item-pack').innerHTML = 'Pack of ' + cartItems.slice(-1)[0]['packSize'];
    document.getElementById('new-item-price').innerHTML = 'Price: ' + (cartItems.slice(-1)[0]['price']).toFixed(2);

    popup.classList.add("show");
}

function hidePopup() {
    let popup = document.getElementById("popup");
    popup.classList.remove("show");
}

function popupFxns(btn, rollNum) {
    callPopup(btn, rollNum);
    setTimeout(function () {
        hidePopup();
    }, 3000);
}

function updatePackSize(element,rollNum, size) { //when a pack size button is clicked, the css is updated to change color backgrounds & this.price is adjusted
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

function updateGlazeOption (rollNum) { //update product price, update this.glazing
    let glazeNum = document.getElementById(rollNum + '-glaze').value;
    let currRoll = currRolls[rollNum]; //finds which roll type is currently being altered
    let glazeType = Object.keys(glazeOptions)[glazeNum];
    currRoll.glazing = glazeType;
    currRoll.price = (basePrice[rollNum] + glazeOptions[glazeType]) * currRoll.packSize;
    let rollID =  "price-" + String(rollNum);
    console.log(rollID);
    document.getElementById(rollID).innerHTML = '$ ' + currRoll.price;
}


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