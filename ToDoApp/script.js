
// // Wait until the entire HTML document is fully loaded
// document.addEventListener("DOMContentLoaded", () => {

//     // Select important elements from the HTML
//     const todoInput = document.getElementById("todo-input");   // Input field
//     const addTaskBtn = document.getElementById("add-task-btn"); // Add button
//     const toDoList = document.getElementById("todo-list");     // <ul> or <ol> list container

//     // Get saved tasks from localStorage
//     // If nothing is saved yet, use an empty array instead
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//     // Loop through saved tasks and display them on page load
//     tasks.forEach(task => {
//         renderTask(task);
//     });

//     // When the "Add Task" button is clicked
//     addTaskBtn.addEventListener("click", function () {

//         // Get input value
//         // trim() removes extra spaces
//         // toLowerCase() makes text lowercase (optional)
//         let taskinputValue = todoInput.value.trim().toLowerCase();

//         // If input is empty, stop the function
//         if (taskinputValue === "") return;

//         // Create a new task object
//         const newTask = {
//             id: Date.now(),      // Unique ID using current timestamp
//             text: taskinputValue, // Task text
//             completed: false     // Task status (not completed yet)
//         };

//         // Add new task to the tasks array
//         tasks.push(newTask);

//         // Save updated tasks array to localStorage
//         saveTasks();

//         // Display the new task on the screen
//         renderTask();

//         // Clear the input field after adding
//         todoInput.value = "";
//     });

//     // Function to save tasks array into localStorage
//     function saveTasks() {
//         // Convert array to JSON string before saving
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//     }

//     // Function to display a task on the page
//     function renderTask(task) {
//         console.log(task.text)

//         const li = document.createElement("li")
//         li.setAttribute("data_id" , task.id)
//         if(task.completed){
//             li.classList.add("completed")
//         }
//         li.innerHTML = `
//         <span>${task.text}</span>
//         <buttton> delete</button>
//         `

//         li.addEventListener("click" , (event) =>{
//             if(event.target.tagName === "BUTTON") return ;
//             task.completed = !task.completed
//             li.classList.toggle("completed")
//             saveTasks()
//         })
        
//         li.querySelector("button").addEventListener("click" , (event) =>{
//             event.stopPropagation()
//             tasks = tasks.filter((t) => t.id !== task.id)
//             li.remove()
//             saveTasks()
//         })

//         toDoList.appendChild(li)
//     }

// });


// Wait until the entire HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Select important elements from the HTML
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const toDoList = document.getElementById("todo-list");

    // Get saved tasks from localStorage or use empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Display saved tasks on page load
    tasks.forEach(task => {
        renderTask(task);
    });

    // Add task button click
    addTaskBtn.addEventListener("click", () => {

        let taskInputValue = todoInput.value.trim().toLowerCase();

        if (taskInputValue === "") return;

        const newTask = {
            id: Date.now(),
            text: taskInputValue,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);

        todoInput.value = "";
    });

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Render task to the screen
    function renderTask(task) {

        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        // Toggle completed when clicking on task (not button)
        li.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") return;

            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        // Delete task
        li.querySelector("button").addEventListener("click", (event) => {
            event.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        toDoList.appendChild(li);
    }

});
