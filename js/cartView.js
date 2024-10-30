// Shopping cart
import { cart } from "./shoppingCart.js";
import { inventory } from "./inventory.js";
const cartContainer = document.getElementById('cart');
const cartItemsContainer = document.getElementById('cart-items');

export function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    // Kui ostukorv on tühi, siis näitab teksti, et on tühi:
    if (cart.items.length === 0) {
        const cartHeading = cartContainer.querySelector('h2');
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Cart is empty.';
        cartHeading.insertAdjacentElement('afterend', emptyCartMessage);
        return;
    } else {  // Kui ei ole tühi, siis tekst kaob
        const emptyCartMessage = cartContainer.querySelector('p');
        if (emptyCartMessage) {
            emptyCartMessage.remove();
        }
    }

    // Add cart header
    const headerRow = document.createElement('div');
    headerRow.className = 'cart-item';
    headerRow.innerHTML = `
        <h3>Product</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
        <h3>Total</h3>
    `;
    cartItemsContainer.appendChild(headerRow);

    // Add cart items
    cart.items.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <span style="display: flex; align-items: center;">
                <img src="${item.product.image_url}" alt="${item.product.name}" style="width: 50px; margin-right: 10px;">
                <h3>${item.product.name}</h3>
            </span>
            <p>${item.product.price}€</p>
            <span style="display: flex; align-items: center; gap: 10px; justify-content: center;">
                <button class="decrease">-</button>
                <p>${item.quantity}</p>
                <button class="increase">+</button>
                <button class="remove"></button>
            </span>
            <p>${(item.product.price * item.quantity).toFixed(2)}€ </p>
        `;

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
                const existingWarningMessages = cartContainer.querySelectorAll('.out-of-stock-message');
                if (existingWarningMessages.length === 0) {
                    const warningMessage = document.createElement('p');
                    warningMessage.className = 'out-of-stock-message';
                    warningMessage.textContent = `Sorry, ${item.product.name} is out of stock.`;
                    cartContainer.appendChild(warningMessage);
                    setTimeout(() => {
                        cartContainer.removeChild(warningMessage);
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

    // Add total row
    const totalRow = document.createElement('div');
    totalRow.className = 'cart-item';
    totalRow.innerHTML = `
        <p>Total</p>
        <p></p>
        <p></p>
        <p>${cart.getTotal()}€</p>
    `;
    cartItemsContainer.appendChild(totalRow);
}
