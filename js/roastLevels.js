import { displayProducts } from "./allProductsView.js";
import { fetchRoastLevels } from "./api.js";

// Categories
export async function displayRoastLevels() {
    const header = document.querySelector('.categories h1');
    header.textContent = 'Filter by roast level'
    const categoriesContainer = document.querySelector('.items-container');
    categoriesContainer.innerHTML = '<div class="item"> <img src="all_beans.png" width=40px></div>'
    categoriesContainer.firstElementChild.addEventListener('click', () => {
        displayProducts();
    });
    const roastLevels = await fetchRoastLevels()
    roastLevels.forEach(level => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'item'
        categoryElement.innerHTML = `<img src="${level}.png" width=40px>`
        categoryElement.addEventListener('click', () => {
            displayProducts(level)
        })
        categoriesContainer.appendChild(categoryElement)
    })
}

export function hideRoastLevels() {
    document.querySelector('.categories h1').textContent = ''
    document.querySelector('.items-container').innerHTML = ''
}
