// DOM Elements
const destinationInput = document.getElementById("destination");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const addDestinationBtn = document.getElementById("addDestinationBtn");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const packingItemInput = document.getElementById("packingItemInput");
const addPackingBtn = document.getElementById("addPackingBtn");
const packingList = document.getElementById("packingList");

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

    const savedPackingItems = JSON.parse(localStorage.getItem("packingItems")) || [];
    savedPackingItems.forEach(item => {
        addPackingItemToList(item);
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

function addTaskToList(text, done = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("done", done);
    taskItem.innerHTML = `
        <span>${text}</span>
        <div class="task-actions">
            <input type="checkbox" class="doneCheckbox" ${done ? "checked" : ""}>
            <button class="removeBtn">X</button>
        </div>
    `;

    taskItem.querySelector(".doneCheckbox").addEventListener("change", () => {
        taskItem.classList.toggle("done", taskItem.querySelector(".doneCheckbox").checked);
        saveTasksToLocalStorage();
    });

    taskItem.querySelector(".removeBtn").addEventListener("click", () => {
        taskItem.remove();
        saveTasksToLocalStorage();
    });

    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [...taskList.querySelectorAll("li")].map(task => ({
        text: task.querySelector("span").textContent,
        done: task.classList.contains("done")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Packing Item
addPackingBtn.addEventListener("click", () => {
    const packingItem = packingItemInput.value.trim();
    if (packingItem) {
        addPackingItemToList(packingItem);
    }
});

function addPackingItemToList(item) {
    const packingItemElement = document.createElement("li");
    packingItemElement.innerHTML = `
        <span>${item}</span>
        <button class="removePackingBtn">X</button>
    `;
    packingItemElement.querySelector(".removePackingBtn").addEventListener("click", () => {
        packingItemElement.remove();
        savePackingToLocalStorage();
    });
    packingList.appendChild(packingItemElement);
    packingItemInput.value = "";
    savePackingToLocalStorage();
}

function savePackingToLocalStorage() {
    const packingItems = [...packingList.querySelectorAll("li")].map(item =>
        item.querySelector("span").textContent
    );
    localStorage.setItem("packingItems", JSON.stringify(packingItems));
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
    packingItemInput.value = "";

    // Clear task and packing lists
    taskList.innerHTML = "";
    packingList.innerHTML = "";

    // Optionally, clear localStorage if you are using it to store data
    localStorage.clear();
});
