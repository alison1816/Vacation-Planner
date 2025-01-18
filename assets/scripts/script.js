//Elements from the DOM
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

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");

signInBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email && password) {
        alert(`Welcome back, ${email}!`);
        emailInput.value = "";
        passwordInput.value = "";
    } else {
        alert("Please enter both email and password.");
    }
});

//Add destination
addDestinationBtn.addEventListener("click", () => {
    const destination = destinationInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (destination && startDate && endDate) {
        alert(`You are going to ${destination} from ${startDate} to ${endDate}!`);
        destinationInput.value = "";
        startDate.value = "";
        endDate.value = "";
    } else {
        alert("Please enter both destination and select travel dates.");
    }
});

//Add task to to-do list
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task}</span>
            <button class="doneBtn">Done</button>
            <button class="removeBtn">Remove</button>
        `;

        taskItem.querySelector(".doneBtn").addEventListener("click", () => {
            taskItem.classList.toggle("done");
        });

        taskItem.querySelector(".removeBtn").addEventListener("click", () => {
            taskItem.remove();
        });
        
        taskList.appendChild(taskItem);
        taskInput.value = "";

        
    }
});

//Add packing item to packing list
addPackingBtn.addEventListener("click", () => {
    const packingItem = packingItemInput.value.trim();
    if(packingItem) {
        const packingItemElement = document.createElement("li");
        packingItemElement.innerHTML = `
        <span>${packingItem}</span>
        <button class="removePackingBtn">Remove</button>
    `;

    packingItemElement.querySelector(".removePackingBtn").addEventListener("click", () => {
        packingItemElement.remove();
    });

    packingList.appendChild(packingItemElement);
    packingItemInput.value = "";
    }
})