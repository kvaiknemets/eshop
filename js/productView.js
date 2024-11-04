import { fetchProductById } from "./api.js";
import { clearCartView } from "./cartView.js";
import { inventory } from "./inventory.js";
import { cart } from "./shoppingCart.js";

export async function loadProductView(productId) {
    const productData = await fetchProductById(productId)
    const product = productData[0]

    const productView = document.createElement('div')
    document.querySelector('.container h1').textContent = product.name
    clearCartView()
    productView.classList.add('product-view');
    productView.innerHTML = `
        <div class="product-content">
            <div class="product-image">
                <img src="${product.image_url}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price"><strong>Price:</strong> ${product.price}€</p>
                <p class="inventory"><strong>In Stock:</strong> ${inventory.itemQuantity(product.name)}</p>
                <button class="buy-button">Add to cart</button>
            </div>
        </div>`

    document.querySelector('.product-view-container').appendChild(productView)

    const addToCartButton = document.querySelector('.product-details .buy-button')
    const productDetails = document.querySelector('.product-details')
    addToCartButton.addEventListener('click', () => {
        if (inventory.itemQuantity(product.name) === 0) {
            const existingWarningMessages = productDetails.querySelectorAll('.out-of-stock-message');
            if (existingWarningMessages.length === 0) {
                const warningMessage = document.createElement('p');
                warningMessage.className = 'out-of-stock-message';
                warningMessage.textContent = `Sorry, ${product.name} is out of stock.`;
                productDetails.appendChild(warningMessage);
                setTimeout(() => {
                    productDetails.removeChild(warningMessage);
                }, 3000);
            }
            return;
        }
        cart.addItem(product, 1);
        const amountInStock = inventory.itemQuantity(product.name);
        const inventoryParagraph = document.querySelector('.product-details .inventory')
        if (amountInStock > 0) {
            inventoryParagraph.innerHTML = `<strong>In Stock:</strong> ${amountInStock}`;
        } else {
            inventoryParagraph.textContent = 'Out of stock';
        }
        // updateCartDisplay();
    });
}

// Tühjendab vaate
export function clearProductView() {
    document.querySelector('.product-view-container').innerHTML = ''
}
