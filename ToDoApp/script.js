// // Wait until the entire HTML document is fully loaded 
// // before running any JavaScript.
// // This prevents errors caused by trying to access elements
// // that haven't been created yet.
// document.addEventListener("DOMContentLoaded", () => {

//     // Select important elements from the HTML using their IDs.
//     // These must match the IDs in your HTML file.
//     const todoInput = document.getElementById("todo-input");   // Input field
//     const addTaskBtn = document.getElementById("add-task-btn"); // Add button
//     const toDoList = document.getElementById("todo-list");      // <ul> or <ol> list container

//     // Retrieve saved tasks from localStorage.
//     // localStorage stores data as strings, so we convert it back to an array using JSON.parse().
//     // If no tasks exist yet, use an empty array as default.
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     // When the page loads, display all previously saved tasks.
//     tasks.forEach(task => {
//         renderTask(task);
//     });

//     // Add event listener to the "Add Task" button.
//     // When clicked, it creates a new task.
//     addTaskBtn.addEventListener("click", () => {

//         // Get the value typed in the input field.
//         // trim() removes extra spaces.
//         // toLowerCase() converts text to lowercase.
//         let taskInputValue = todoInput.value.trim().toLowerCase();

//         // If input is empty, stop the function.
//         if (taskInputValue === "") return;

//         // Create a new task object.
//         // id: unique value using current timestamp.
//         // text: the task description.
//         // completed: default is false.
//         const newTask = {
//             id: Date.now(),
//             text: taskInputValue,
//             completed: false
//         };

//         // Add new task to the tasks array.
//         tasks.push(newTask);

//         // Save updated tasks array to localStorage.
//         saveTasks();

//         // Display the new task on the page.
//         renderTask(newTask);

//         // Clear the input field after adding the task.
//         todoInput.value = "";
//     });

//     // Function to save tasks to localStorage.
//     // JSON.stringify() converts the array into a string.
//     function saveTasks() {
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//     }

//     // Function that creates and displays a task in the list.
//     function renderTask(task) {

//         // Create a new <li> element.
//         const li = document.createElement("li");

//         // Store the task's id inside the <li> using a custom attribute.
//         li.setAttribute("data-id", task.id);

//         // If task was previously marked as completed,
//         // add the "completed" CSS class.
//         if (task.completed) {
//             li.classList.add("completed");
//         }

//         // Insert task text and a Delete button inside the <li>.
//         li.innerHTML = `
//             <span>${task.text}</span>
//             <button>Delete</button>
//         `;

//         // Add click event to toggle completed status.
//         // If the Delete button is clicked, ignore this toggle.
//         li.addEventListener("click", (event) => {

//             // Prevent toggling when Delete button is clicked.
//             if (event.target.tagName === "BUTTON") return;

//             // Switch completed status (true ↔ false).
//             task.completed = !task.completed;

//             // Visually toggle the "completed" CSS class.
//             li.classList.toggle("completed");

//             // Save updated status.
//             saveTasks();
//         });

//         // Add click event for Delete button.
//         li.querySelector("button").addEventListener("click", (event) => {

//             // Prevent this click from triggering the li click event.
//             event.stopPropagation();

//             // Remove the task from the array.
//             tasks = tasks.filter(t => t.id !== task.id);

//             // Remove the <li> from the page.
//             li.remove();

//             // Save updated tasks array.
//             saveTasks();
//         });

//         // Finally, add the <li> element to the list in the HTML.
//         toDoList.appendChild(li);
//     }

// });







// Wait until the entire HTML document is fully loaded 
// before running any JavaScript.
// This prevents errors caused by trying to access elements
// that haven't been created yet.
document.addEventListener("DOMContentLoaded", () => {

    // Select important elements from the HTML using their IDs.
    // These must match the IDs in your HTML file.
    const todoInput = document.getElementById("todo-input");   // Input field
    const addTaskBtn = document.getElementById("add-task-btn"); // Add button
    const toDoList = document.getElementById("todo-list");      // <ul> or <ol> list container

    // Retrieve saved tasks from localStorage.
    // localStorage stores data as strings, so we convert it back to an array using JSON.parse().
    // If no tasks exist yet, use an empty array as default.
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // When the page loads, display all previously saved tasks.
    tasks.forEach(task => {
        renderTask(task);
    });

    // Add event listener to the "Add Task" button.
    // When clicked, it creates a new task.
    addTaskBtn.addEventListener("click", () => {

        // Get the value typed in the input field.
        // trim() removes extra spaces.
        // toLowerCase() converts text to lowercase.
        let taskInputValue = todoInput.value.trim().toLowerCase();

        // If input is empty, stop the function.
        if (taskInputValue === "") return;

        // Create a new task object.
        // id: unique value using current timestamp.
        // text: the task description.
        // completed: default is false.
        const newTask = {
            id: Date.now(),
            text: taskInputValue,
            completed: false
        };

        // Add new task to the tasks array.
        tasks.push(newTask);

        // Save updated tasks array to localStorage.
        saveTasks();

        // Display the new task on the page.
        renderTask(newTask);

        // Clear the input field after adding the task.
        todoInput.value = "";
    });

    // Function to save tasks to localStorage.
    // JSON.stringify() converts the array into a string.
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  

    // Function that creates and displays a task in the list
function renderTask(task) {

    // Create a new <li> element for the task
    const li = document.createElement("li");

    // Store the task id inside the <li> using a custom data attribute
    li.setAttribute("data-id", task.id);

    // If the task was previously marked as completed,
    // add the CSS class so it appears completed when page loads
    if (task.completed) {
        li.classList.add("completed");
    }

    // Insert task text and buttons inside the <li>
    // We give buttons class names so we can select them easily
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // -----------------------------
    // TOGGLE COMPLETED FUNCTIONALITY
    // -----------------------------
    // When clicking anywhere on the <li> (except buttons),
    // toggle the completed state
    li.addEventListener("click", (event) => {

        // If a button was clicked, do NOT toggle
        if (event.target.tagName === "BUTTON") return;

        // Switch completed value (true ↔ false)
        task.completed = !task.completed;

        // Visually toggle the "completed" class
        li.classList.toggle("completed");

        // Save updated tasks to localStorage
        saveTasks();
    });

    // -----------------------------
    // EDIT TASK FUNCTIONALITY
    // -----------------------------
    li.querySelector(".edit-btn").addEventListener("click", (event) => {

        // Prevent this click from triggering the <li> click event
        event.stopPropagation();

        // Show a prompt with the current task text
        const updatedText = prompt("Update your task:", task.text);

        // If user clicks Cancel or enters empty text, do nothing
        if (!updatedText || updatedText.trim() === "") return;

        // Update the task object in the array
        task.text = updatedText.trim();

        // Update the text shown on the screen
        li.querySelector("span").textContent = task.text;

        // Save updated tasks array to localStorage
        saveTasks();
    });

    // -----------------------------
    // DELETE TASK FUNCTIONALITY
    // -----------------------------
    li.querySelector(".delete-btn").addEventListener("click", (event) => {

        // Prevent click from bubbling up to <li>
        event.stopPropagation();

        // Remove the task from the tasks array
        tasks = tasks.filter(t => t.id !== task.id);

        // Remove the task element from the page
        li.remove();

        // Save updated tasks array to localStorage
        saveTasks();
    });

    // Finally, add the <li> to the task list in the HTML
    toDoList.appendChild(li);
}


});
