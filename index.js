import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase ref push } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

const appSettings={
    databaseURL: "https://realtime-database-bbc4f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")



const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    inputFieldEl.value = ""
    
    shoppingListEl.innerHTML += `<li>${inputValue}</li>`
})
    
    






