import { fetchProducts } from "./api.js";

export async function displayProducts(category) {
    const products = await fetchProducts();
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';

    let displayedProducts;
    if (category) {
        displayedProducts = products.filter(product => product.category === category);
    } else {
        displayedProducts = products;
    }
    displayedProducts.forEach(product => {
        const productElement = document.createElement('div');
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to cart';
        const inventoryParagraph = document.createElement('p');

        // const updateInventoryDisplay = () => {
        //     const amountInStock = inventory.itemQuantity(product.name);
        //     if (amountInStock > 0) {
        //         inventoryParagraph.textContent = `In stock: ${amountInStock}`;
        //     } else {
        //         inventoryParagraph.textContent = 'Out of stock';
        //     }
        // }
        // product.updateInventoryDisplay = updateInventoryDisplay;

        // Tootekaart
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" style="width: 150px;">
            <h2>${product.name}</h2>
            <p>Price: ${product.price}€</p>
        `;
        productElement.appendChild(addToCartButton);
        productElement.appendChild(inventoryParagraph);
        // updateInventoryDisplay();
        // addToCartButton.addEventListener('click', () => {
        //     if (inventory.itemQuantity(product.name) === 0) {
        //         const existingWarningMessages = productElement.querySelectorAll('.out-of-stock-message');
        //         if (existingWarningMessages.length === 0) {
        //             const warningMessage = document.createElement('p');
        //             warningMessage.className = 'out-of-stock-message';
        //             warningMessage.textContent = `Sorry, ${product.name} is out of stock.`;
        //             productElement.appendChild(warningMessage);
        //             setTimeout(() => {
        //                 productElement.removeChild(warningMessage);
        //             }, 3000);
        //         }
        //         return;
        //     }
        //     cart.addItem(product, 1);
        //     updateInventoryDisplay();
        //     updateCartDisplay();
        // });
        productContainer.appendChild(productElement);
    });
}
