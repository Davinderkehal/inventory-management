class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price *= (1 - discount);
        });
    }
}
class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}
class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        this.inventory.push(product);
    }

    getInventoryValue() {
        return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }

    findProductByName(name) {
        return this.inventory.find(product => product.name === name) || null;
    }
}
const store = new Store();
const apple = new ProductProperties('Apple', 2.5, 50);
const banana = new ProductProperties('Banana', 1.2, 100);
const milk = new PerishableProductProperties('Milk', 1.5, 10, '2024-12-31');
const cheese = new PerishableProductProperties('Cheese', 5.0, 20, '2025-01-15');
const bread = new ProductProperties('Bread', 2.0, 30);

store.addProduct(apple);
store.addProduct(banana);
store.addProduct(milk);
store.addProduct(cheese);
store.addProduct(bread);
function updateInventoryUI() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    store.inventory.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product.toString();
        inventoryList.appendChild(listItem);
    });
    document.getElementById('total-value-before').textContent = `Total Inventory Value (Before Discount): $${store.getInventoryValue().toFixed(2)}`;
}
function applyDiscountAndUpdateUI() {
    ProductProperties.applyDiscount(store.inventory, 0.15);
    document.getElementById('total-value-after').textContent = `Total Inventory Value (After Discount): $${store.getInventoryValue().toFixed(2)}`;
}
