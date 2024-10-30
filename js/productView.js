import { fetchProducts } from "./api.js";
import { products } from "./allProductsView.js";

export function loadProductView(param) {
    const product = products.find(prod => prod.id === param)

    const productView = document.createElement('div')
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
                <p class="inventory"><strong>In Stock:</strong> ${product.inventory}</p>
                <button class="buy-button">Buy Now</button>
            </div>
        </div>`

    document.querySelector('.product-view-container').appendChild(productView)
}

// Tühjendab vaate
export function clearProductView() {
    document.querySelector('.product-view-container').innerHTML = ''
}
