//Elements from the DOM
const destinationInput = document.getElementById("destination");
const travelDatesInput = document.getElementById("travel-dates");
const addDestinationBtn = document.getElementById("addDestinationBtn");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const packingItemInput = document.getElementById("packingItemInput");
const addPackingBtn = document.getElementById("addPackingBtn");
const packingList = document.getElementById("packingList");

//Add destination
addDestinationBtn.addEventListener("click", () => {
    const destination = destinationInput.value.trim();
    const travelDates = travelDatesInput.value.trim();

    if (destination && travelDates) {
        alert(`You are going to ${destination} from ${travelDates}!`);
        destinationInput.value = "";
        travelDatesInput.value = "";
    } else {
        alert("Please enter both destination and travel dates.");
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