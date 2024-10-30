import { displayProducts } from "./allProductsView.js";

async function initApp() {
    await displayProducts();

}

document.addEventListener("DOMContentLoaded", initApp);