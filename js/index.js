import { displayProducts } from "./allProductsView.js";
import { displayRoastLevels } from "./roastLevels.js";

async function initApp() {
    await displayProducts();
    await displayRoastLevels()

}

document.addEventListener("DOMContentLoaded", initApp);