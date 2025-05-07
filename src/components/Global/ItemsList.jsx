import React from "react"

class ItemsList {
    static mySet = new Set();

    // Static block to add elements to the Set
    static {
        const storedSet = localStorage.getItem('itemsSet');
        if (storedSet) {
            // Parse and load the Set from localStorage
            ItemsList.mySet = new Set(JSON.parse(storedSet));
        } else {
            // Default values if localStorage is empty
            ItemsList.mySet.add({ name: 'Apple', amount: 3, unitPrice: 1.5 });
            ItemsList.mySet.add({ name: 'Banana', amount: 5, unitPrice: 0.75 });
            ItemsList.mySet.add({ name: 'Orange', amount: 2, unitPrice: 2.0 });
            ItemsList.mySet.add({ name: 'Grapes', amount: 4, unitPrice: 2.5 });
            this.saveToLocalStorage(); // Save default values to localStorage
        }
    }

    // Convert the Set to an Array
    arrayFromSet = Array.from(ItemsList.mySet);

    // Method to find the index by 'name'
    findIndexByName(name) {
        return this.arrayFromSet.findIndex(item => item.name === name);
    }
    // Method to save the Set to localStorage
    static saveToLocalStorage() {
        localStorage.setItem('itemsSet', JSON.stringify(Array.from(ItemsList.mySet)));
    }
    // Method to remove an item by name
    removeItemByName(name) {
        const index = this.findIndexByName(name);
        if (index !== -1) {
            // Remove the element at that index
            this.arrayFromSet.splice(index, 1);
        }
        // Optionally convert back to a Set
        const updatedSet = new Set(this.arrayFromSet);
        // Save updated Set to localStorage
        ItemsList.saveToLocalStorage();
                return updatedSet;
    }
    addItem(item) {
        if (item && item.name && item.amount !== undefined && item.unitPrice !== undefined) {
            ItemsList.mySet.add(item);
            this.arrayFromSet = Array.from(ItemsList.mySet); // Update the arrayFromSet
             // Optionally convert back to a Set
            const updatedSet = new Set(this.arrayFromSet);
            // Save updated Set to localStorage
            ItemsList.saveToLocalStorage();
        } else {
            console.log('Invalid item format.');
        }
    }

   
}
export default new ItemsList()