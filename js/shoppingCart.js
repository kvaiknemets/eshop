import { inventory } from './inventory.js';

class ShoppingCart {
    constructor() {
        this.items = []; // Massiiv toodete hoidmiseks
    }

    #findItemIndex(productName) {
        return this.items.findIndex(item => item.product.name === productName);
    }

    // Meetod toote lisamiseks ostukorvi
    addItem(product, quantity) {
        if (inventory.itemQuantity(product.name) < quantity) {
            console.log(`Not enough ${product.name} in inventory`);
            return;
        }

        // Kontrollib, kas toode on juba ostukorvis
        const existingProductIndex = this.#findItemIndex(product.name);
        if (existingProductIndex !== -1) {
            // Kui toode on juba ostukorvis, suurendab kogust
            this.items[existingProductIndex].quantity += quantity;
        } else {
            // Kui toodet pole, lisab uue objekti massiivi
            this.items.push({ product, quantity });
        }
        inventory.removeItem(product.name, quantity);
    }
    // Meetod toote eemaldamiseks ostukorvist nime järgi
    removeItem(productName) {
        const existingProductIndex = this.#findItemIndex(productName);
        inventory.addItem(this.items[existingProductIndex].product, this.items[existingProductIndex].quantity);
        // Filtreerib välja toote vastavalt nimele
        this.items = this.items.filter(item => item.product.name !== productName);
    }

    // Meetod ostukorvi kogusumma arvutamiseks
    getTotal() {
        const total = this.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
        return total.toFixed(2);
    }

    // Meetod, mis tagastab ostukorvis olevate toodete loendi koos kogustega
    listItems() {
        console.log(this.items)
        return this.items.map(item =>
            `Product: ${item.product.name}, Price: ${item.product.price}€, Amount: ${item.quantity}`
        ).join('\n');
    }

    decreaseItemQuantity(productName) {
        const existingProductIndex = this.#findItemIndex(productName);
        if (existingProductIndex !== -1) {
            if (this.items[existingProductIndex].quantity > 1) {
                inventory.addItem(this.items[existingProductIndex].product, 1);
                this.items[existingProductIndex].quantity -= 1;
            } else {
                this.removeItem(productName);
            }
        }
    }

    clearCart() {
        this.items = [];
    }
}

export const cart = new ShoppingCart()
