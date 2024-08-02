// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase configuration object containing the database URL
const appSettings = {
    databaseURL: "https://realtime-database-bbc4f-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Initialize Firebase app with the given settings
const app = initializeApp(appSettings);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Create a reference to the "shoppingList" node in the database
const shoppingListInDB = ref(database, "shoppingList");

// Get references to the HTML elements
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

// Add event listener to the "Add to cart" button
addButtonEl.addEventListener("click", function() {
    // Get the value from the input field
    let inputValue = inputFieldEl.value;
    
    // Push the input value to the database under "shoppingList"
    push(shoppingListInDB, inputValue);
    
    // Clear the input field after adding the item
    clearInputFieldEl();
});

// Listen for changes in the "shoppingList" node in the database
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        // Get the items as an array of [key, value] pairs
        let itemsArray = Object.entries(snapshot.val());
    
        // Clear the current shopping list
        clearShoppingListEl();
        
        // Iterate through each item and append it to the shopping list
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            
            appendItemToShoppingListEl(currentItem);
        }    
    } else {
        // If no items exist, display a placeholder message
        shoppingListEl.innerHTML = "No items here... yet";
    }
});

// Function to clear the shopping list element
function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

// Function to clear the input field element
function clearInputFieldEl() {
    inputFieldEl.value = "";
}

// Function to append an item to the shopping list element
function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];
    
    // Create a new list item element
    let newEl = document.createElement("li");
    
    // Set the text content of the list item to the item value
    newEl.textContent = itemValue;
    
    // Add event listener to the list item for removal on click
    newEl.addEventListener("click", function() {
        // Get the exact location of the item in the database
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        
        // Remove the item from the database
        remove(exactLocationOfItemInDB);
    });
    
    // Append the new list item to the shopping list element
    shoppingListEl.append(newEl);
}
