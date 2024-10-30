class Inventory {
    constructor() {
        this.items = [];
    }

    #findItemIndex(productName) {
        return this.items.findIndex(item => item.product === productName);
    }

    addItem(product, quantity = 1) {
        const existingProductIndex = this.#findItemIndex(product.name);
        if (existingProductIndex !== -1) {
            this.items[existingProductIndex].quantity += quantity;
        } else {
            this.items.push({ product: product.name, quantity: quantity });
        }
    }

    removeItem(productName, quantity = 1) {
        const existingProductIndex = this.#findItemIndex(productName);
        if (existingProductIndex !== -1) {
            if (this.items[existingProductIndex].quantity >= quantity) {
                this.items[existingProductIndex].quantity -= quantity;
            } else {
                console.log(`Not enough ${productName} in inventory`);
            }
        }
    }

    itemQuantity(productName) {
        const existingProductIndex = this.#findItemIndex(productName);
        return existingProductIndex !== -1 ? this.items[existingProductIndex].quantity : 0;
    }
}

export const inventory = new Inventory();
