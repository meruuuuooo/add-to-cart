import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-cbde3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");


addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    if (inputValue === "") {
      alert(`Error no added value!`);
    } else {
      push(shoppingListInDB, inputValue);
      clearInputFieldEl()
    }
    
  });

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let shoppingList = Object.entries(snapshot.val())
    clearShoppingListEl()
    for (let i = 0; i < shoppingList.length; i++) {
        let currentItem = shoppingList[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingEl(currentItem)
    }
    } else {
        shoppingListEl.innerHTML = "No item here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEL = document.createElement("li")
    
    newEL.textContent = itemValue

    newEL.addEventListener("dblclick", function() {
        let exactLocationItem = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationItem)
        console.log(itemID)
    })

    shoppingListEl.append(newEL)
}
