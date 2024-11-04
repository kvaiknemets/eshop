import { displayProducts } from "./allProductsView.js";
import { updateCartDisplay } from "./cartView.js";
import { navigate } from "./router.js";

async function initApp() {
    await displayProducts();
    document.querySelector('.cart-icon').addEventListener('click', () => {
        navigate('cart')
    })
    document.getElementById('logo').addEventListener('click', () => {
        navigate('category')
    })
}

document.addEventListener("DOMContentLoaded", initApp);