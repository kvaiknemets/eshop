import { displayProducts } from "./allProductsView.js";
import { fetchRoastLevels } from "./api.js";

// Categories
export async function displayRoastLevels() {
    const categoriesContainer = document.querySelector('.items-container');
    categoriesContainer.firstElementChild.addEventListener('click', () => {
        displayProducts();
    });
    const roastLevels = await fetchRoastLevels()
    roastLevels.forEach(level => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'item'
        categoryElement.innerHTML = level
        categoryElement.addEventListener('click', () => {
            displayProducts(level)
        })
        categoriesContainer.appendChild(categoryElement)
    })
}
