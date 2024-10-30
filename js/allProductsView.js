import { fetchProducts } from "./api.js";
import { inventory } from "./inventory.js";
import { cart } from "./shoppingCart.js";
import { updateCartDisplay } from "./cartView.js";
import { navigate } from "./router.js";
import { clearProductView } from "./productView.js";
import { hideRoastLevels, displayRoastLevels } from "./roastLevels.js";

export let products = []
export async function displayProducts(roastLevel) {
    clearProductView()
    if (products.length === 0) {
        products = await fetchProducts();
    }
    const header = document.querySelector('.container h1');
    header.textContent = 'Products'
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';

    await displayRoastLevels()

    let displayedProducts;
    if (roastLevel && roastLevel !== 'all') {
        displayedProducts = products.filter(product => product.roast_level === roastLevel);
    } else {
        displayedProducts = products;
    }
    displayedProducts.forEach(product => {
        const productElement = document.createElement('div');
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'product-button-container'
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to cart';
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View product';
        const inventoryParagraph = document.createElement('p');

        const updateInventoryDisplay = () => {
            const amountInStock = inventory.itemQuantity(product.name);
            if (amountInStock > 0) {
                inventoryParagraph.textContent = `In stock: ${amountInStock}`;
            } else {
                inventoryParagraph.textContent = 'Out of stock';
            }
        }
        product.updateInventoryDisplay = updateInventoryDisplay;

        // Tootekaart
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" style="width: 210px; height: 210px;">
            <h2>${product.name}</h2>
            <p>Price: ${product.price}€</p>
        `;
        productElement.appendChild(buttonContainer);
        buttonContainer.appendChild(addToCartButton);
        buttonContainer.appendChild(viewButton)
        productElement.appendChild(inventoryParagraph);
        updateInventoryDisplay();
        addToCartButton.addEventListener('click', () => {
            if (inventory.itemQuantity(product.name) === 0) {
                const existingWarningMessages = productElement.querySelectorAll('.out-of-stock-message');
                if (existingWarningMessages.length === 0) {
                    const warningMessage = document.createElement('p');
                    warningMessage.className = 'out-of-stock-message';
                    warningMessage.textContent = `Sorry, ${product.name} is out of stock.`;
                    productElement.appendChild(warningMessage);
                    setTimeout(() => {
                        productElement.removeChild(warningMessage);
                    }, 3000);
                }
                return;
            }
            cart.addItem(product, 1);
            updateInventoryDisplay();
            updateCartDisplay();
        });
        viewButton.addEventListener('click', () => {
            document.querySelector('.container h1').textContent = product.name
            document.querySelector('.product-container').innerHTML = ''
            hideRoastLevels()
            navigate('product', product.id)
        })
        productContainer.appendChild(productElement);
    });
}
