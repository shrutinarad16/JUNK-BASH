// script.js

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
// const checkoutButton = document.getElementById('checkout-button');
let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

checkoutButton.addEventListener('click', checkout);

function addToCart(event) {
    const button = event.target;
    const product = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));

    const item = {
        product,
        price
    };

    cart.push(item);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `${item.product} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(div);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// function checkout() {
//     // You can implement checkout logic here, e.g., redirect to a payment page
//     alert('Checkout functionality is not implemented in this example.');
// // cartscript.js

// const checkoutButton = document.getElementById('checkout-button');
// checkoutButton.addEventListener('click', () => {
//     // Implement your checkout logic here
//     alert('Checkout process initiated. Redirecting to payment...');
//     // You can redirect the user to a payment page or perform other actions as needed.
// });

// cartscript.js

const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
    // Simulate a checkout process (replace with your actual logic)
    alert('Checkout process initiated. Redirecting to payment...');

    // Here, you can redirect to a payment page or perform further actions as needed
    // Example:
    // window.location.href = 'https://example.com/payment'; // Redirect to a payment page

    // Clear the cart and update the total price (you need to implement this)
    clearCart();
});

// Function to clear the cart (you need to implement this)
function clearCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear the cart items and update the total price
    cartItems.innerHTML = '';
    cartTotal.textContent = '0.00';
}



