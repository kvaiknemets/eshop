// Shopping cart
import { cart } from "./shoppingCart.js";
import { inventory } from "./inventory.js";
import { hideRoastLevels } from "./roastLevels.js";
import { clearProductView } from "./productView.js";
const cartContainer = document.querySelector('.cart-container');

export function updateCartDisplay() {
    cartContainer.innerHTML = `
        <div id="cart">
            <div id="cart-items">
            </div>
        </div>`
    const cartDiv = document.getElementById('cart')
    const cartItemsContainer = document.getElementById('cart-items');
    // Kui ostukorv on tühi, siis näitab teksti, et on tühi:
    if (cart.items.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Cart is empty.';
        cartDiv.appendChild(emptyCartMessage)
        return;
    } else {  // Kui ei ole tühi, siis tekst kaob
        const emptyCartMessage = cartDiv.querySelector('p');
        if (emptyCartMessage) {
            emptyCartMessage.remove();
        }
    }

    // Ostukorvi päis
    const headerRow = document.createElement('div');
    headerRow.className = 'cart-item';
    headerRow.innerHTML = `
        <h3>Product</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
        <h3>Total</h3>
    `;
    cartItemsContainer.appendChild(headerRow);

    // Ostukorvi sisu
    cart.items.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <span class="product-in-cart">
                <img src="${item.product.image_url}" alt="${item.product.name}">
                <h3>${item.product.name}</h3>
            </span>
            <p>${item.product.price}€</p>
            <span class="quantity-controls">
                <button class="decrease">-</button>
                <p>${item.quantity}</p>
                <button class="increase">+</button>
                <button class="remove"></button>
            </span>
            <p>${(item.product.price * item.quantity).toFixed(2)}€ </p>
        `;

        // Lisa ja eemalda nupud
        const decreaseButton = itemRow.querySelector('.decrease');
        const increaseButton = itemRow.querySelector('.increase');
        const removeButton = itemRow.querySelector('.remove');
        decreaseButton.addEventListener('click', () => {
            cart.decreaseItemQuantity(item.product.name);
            item.product.updateInventoryDisplay();
            updateCartDisplay();
        });

        increaseButton.addEventListener('click', () => {
            if (inventory.itemQuantity(item.product.name) === 0) {
                const existingWarningMessages = cartDiv.querySelectorAll('.out-of-stock-message');
                if (existingWarningMessages.length === 0) {
                    const warningMessage = document.createElement('p');
                    warningMessage.className = 'out-of-stock-message';
                    warningMessage.textContent = `Sorry, ${item.product.name} is out of stock.`;
                    cartDiv.appendChild(warningMessage);
                    setTimeout(() => {
                        cartDiv.removeChild(warningMessage);
                    }, 3000);
                }
                return;
            }
            cart.addItem(item.product, 1);
            item.product.updateInventoryDisplay();
            updateCartDisplay();
        });

        removeButton.addEventListener('click', () => {
            cart.removeItem(item.product.name);
            item.product.updateInventoryDisplay();
            updateCartDisplay();
        });

        cartItemsContainer.appendChild(itemRow);
    });

    // Total price rida
    const totalRow = document.createElement('div');
    totalRow.className = 'cart-item';
    totalRow.innerHTML = `
        <p>Total</p>
        <p></p>
        <p></p>
        <p>${cart.getTotal()}€</p>
    `;
    cartItemsContainer.appendChild(totalRow);
    const buyRow = document.createElement('div');
    buyRow.className = 'cart-item';
    buyRow.innerHTML = `
        <p></p>
        <p></p>
        <p></p>
        <button class="buy-button">Buy Now</button>`
    cartItemsContainer.appendChild(buyRow)
}

export function loadCartView() {
    document.querySelector('.product-container').innerHTML = ''
    document.querySelector('.container h1').textContent = 'Cart'
    hideRoastLevels()
    clearProductView()
    updateCartDisplay();
}

// Tühjendab vaate
export function clearCartView() {
    const cartDiv = document.getElementById('cart')
    if (cartDiv) {
        cartDiv.remove()
    }
}
