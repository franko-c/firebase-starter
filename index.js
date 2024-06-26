import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appConfig = {
    databaseURL: "https://wrk-hrs-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appConfig);
const database = getDatabase(app);
const itemsRef = ref(database, "items");

const inputEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const itemsListEl = document.getElementById("items-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputEl.value;
    
    push(itemsRef, inputValue);
    
    clearInput();
});

onValue(itemsRef, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearItemsList();
        
        itemsArray.forEach(([id, value]) => {
            appendItemToList(id, value);
        });
    } else {
        itemsListEl.innerHTML = "No items here... yet";
    }
});

function clearItemsList() {
    itemsListEl.innerHTML = "";
}

function clearInput() {
    inputEl.value = "";
}

function appendItemToList(id, value) {
    let newEl = document.createElement("li");
    
    newEl.textContent = value;
    
    newEl.addEventListener("dblclick", function() {
        let itemRef = ref(database, `items/${id}`);
        
        remove(itemRef);
    });
    
    itemsListEl.append(newEl);
}