// DOM Elements
const destinationInput = document.getElementById("destination");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const addDestinationBtn = document.getElementById("addDestinationBtn");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const shoppingItemInput = document.getElementById("shoppingItemInput");
const addShoppingBtn = document.getElementById("addShoppingBtn");
const shoppingList = document.getElementById("shoppingList");

// Add Destination
addDestinationBtn.addEventListener("click", () => {
    const destination = destinationInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (destination && startDate && endDate) {
        const destinationSection = document.querySelector(".destination");
        destinationSection.innerHTML = `
            <h2>Your Destination</h2>
            <h3>Trip to ${destination}</h3>
            <p>From: ${new Date(startDate).toLocaleDateString()}</p>
            <p>To: ${new Date(endDate).toLocaleDateString()}</p>
        `;
        saveDestinationToLocalStorage(destination, startDate, endDate);
    } else {
        alert("Please enter both a destination and travel dates.");
    }
});

// Save and Load Data from Local Storage
function saveDestinationToLocalStorage(destination, startDate, endDate) {
    const tripData = { destination, startDate, endDate };
    localStorage.setItem("trip", JSON.stringify(tripData));
}

window.addEventListener("DOMContentLoaded", () => {
    loadLocalStorageData();
});

function loadLocalStorageData() {
    const savedTrip = JSON.parse(localStorage.getItem("trip"));
    if (savedTrip) {
        updateDestinationSection(savedTrip.destination, savedTrip.startDate, savedTrip.endDate);
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.done);
    });

    const savedShoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];
    savedShoppingItems.forEach(item => {
        addShoppingItemToList(item);
    });
}

function updateDestinationSection(destination, startDate, endDate) {
    const destinationSection = document.querySelector(".destination");
    destinationSection.innerHTML = `
        <h2>Your Destination</h2>
        <h3>Trip to ${destination}</h3>
        <p>From: ${new Date(startDate).toLocaleDateString()}</p>
        <p>To: ${new Date(endDate).toLocaleDateString()}</p>
    `;
}

// Add Task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        addTaskToList(task);
    }
});

function addTaskToList(item, done = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("done", done);
    taskItem.innerHTML = `
        <span>${item}</span>
        <div class="task-actions">
            <input type="checkbox" class="doneCheckbox" ${done ? "checked" : ""}>
            <button class="removeBtn">X</button>
        </div>
    `;
    
    taskItem.querySelector(".doneCheckbox").addEventListener("change", () => {
        taskItem.classList.toggle("done", taskItem.querySelector(".doneCheckbox").checked);
        saveTasksToLocalStorage();
    });

    taskItem.querySelector(".removeBtn").addEventListener("click", (event) => {
        removeItem(event.target);
    });

    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveTasksToLocalStorage();
}

// Toggle checkbox completion (cross-out text)
function toggleCompletion(checkbox) {
    const itemText = checkbox.parentElement.querySelector("span");
    
    if (checkbox.checked) {
      itemText.style.textDecoration = "line-through";
    } else {
      itemText.style.textDecoration = "none";
    }
  }

// Remove item with confirmation
function removeItem(button) {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
        const item = button.parentElement.parentElement; // Adjust selector to target the <li>
        item.remove();
        // Save to localStorage after removal
        saveTasksToLocalStorage();
        saveShoppingToLocalStorage();
    }
}

  function editItem(button) {
    const item = button.parentElement;
    const itemText = item.querySelector("span");
    
    // Replace text with input field for editing
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = itemText.textContent;
    itemText.replaceWith(newInput);
  
    // Change "Edit" button to "Save"
    button.textContent = "Save";
    button.onclick = function() {
      saveItem(button);
    };
  }

  // Save edited item
function saveItem(button) {
    const item = button.parentElement;
    const newInput = item.querySelector("input[type='text']");
    const newText = newInput.value.trim();
  
    if (newText) {
      const newTextSpan = document.createElement("span");
      newTextSpan.textContent = newText;
      newInput.replaceWith(newTextSpan);
  
      // Change "Save" button back to "Edit"
      button.textContent = "Edit";
      button.onclick = function() {
        editItem(button);
      };
    }
  }

function saveTasksToLocalStorage() {
    const tasks = [...taskList.querySelectorAll("li")].map(task => ({
        text: task.querySelector("span").textContent,
        done: task.classList.contains("done")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addShoppingBtn.addEventListener("click", () => {
    const shoppingItem = shoppingItemInput.value.trim();
    if (shoppingItem) {
        addShoppingItemToList(shoppingItem);
    }
});

function addShoppingItemToList(item, done = false) {
    const shoppingItemElement = document.createElement("li");
    shoppingItemElement.classList.toggle("done", done);
    shoppingItemElement.innerHTML = `
        <span>${item}</span>
        <div class="task-actions">
            <input type="checkbox" class="doneCheckbox" ${done ? "checked" : ""}>
            <button class="removeBtn">X</button>
        </div>
    `;

    shoppingItemElement.querySelector(".doneCheckbox").addEventListener("change", () => {
        shoppingItemElement.classList.toggle("done", shoppingItemElement.querySelector(".doneCheckbox").checked);
        saveShoppingToLocalStorage();
    });

    shoppingItemElement.querySelector(".removeBtn").addEventListener("click", (event) => {
        removeItem(event.target);
    });

    shoppingList.appendChild(shoppingItemElement);
    shoppingItemInput.value = "";
    saveShoppingToLocalStorage();
}

function saveShoppingToLocalStorage() {
    const shoppingItems = [...shoppingList.querySelectorAll("li")].map(item =>
        item.querySelector("span").textContent
    );
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

// Get the clear button
const clearButton = document.getElementById("clearButton");

// Add event listener to clear the page when the button is clicked
clearButton.addEventListener("click", () => {
    // Reset input fields
    destinationInput.value = "";
    startDateInput.value = "";
    endDateInput.value = "";
    taskInput.value = "";
    shoppingItemInput.value = "";

    // Clear task and shopping lists
    taskList.innerHTML = "";
    shoppingList.innerHTML = "";

    // Optionally, clear localStorage if you are using it to store data
    localStorage.clear();
});
