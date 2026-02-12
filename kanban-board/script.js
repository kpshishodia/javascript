


// Wait for the DOM to fully load before running any scripts
document.addEventListener("DOMContentLoaded", () => {

  // Select modal element and buttons for toggling modal & adding a task
  const modal = document.querySelector(".modal");
  const toggleModalBtn = document.getElementById("toggle-modal");
  const addTaskBtn = document.getElementById("add-new-task");

  // Select input fields inside the modal for task title and description
  const titleInput = document.querySelector(".modal input");
  const descInput = document.querySelector(".modal textarea");

  // Select all columns in the Kanban board
  const columns = document.querySelectorAll(".column");

  // Variable to keep track of the task currently being dragged
  let dragTask = null;

  // Retrieve tasks from localStorage or initialize as an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render all existing tasks from localStorage
  tasks.forEach(task => renderTask(task));

  // Update the task counts for each column
  updateCounts();

  // Open the modal when the "Add Task" button is clicked
  toggleModalBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Close modal when clicking on the modal background
  modal.querySelector(".bg").addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Add a new task when the "Add" button inside the modal is clicked
  addTaskBtn.addEventListener("click", () => {

    // Get input values and trim whitespace
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    // If title is empty, do nothing
    if (!title) return;

    // Create a new task object with a unique ID and default status "todo"
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      title,
      description: desc,
      status: "todo"
    };

    // Add new task to the tasks array
    tasks.push(newTask);

    // Save updated tasks to localStorage
    saveTasks();

    // Render the new task on the page
    renderTask(newTask);

    // Update the task counts for each column
    updateCounts();

    // Clear input fields
    titleInput.value = "";
    descInput.value = "";

    // Close the modal
    modal.classList.remove("active");
  });

  // Function to render a task in the appropriate column
  function renderTask(task){

    // Create a new div for the task
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("draggable", true); // Make task draggable
    taskDiv.dataset.id = task.id; // Store task ID as a data attribute

    // Add task content including title, description, and delete button
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || ""}</p>
      <div class="task-actions">
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Attach drag-and-drop events to the task
    attachDragEvents(taskDiv);

    // Add event listener to the delete button
    taskDiv.querySelector(".delete-btn").addEventListener("click", () => {
      // Remove the task from the array
      tasks = tasks.filter(t => t.id !== task.id);

      // Remove task element from the DOM
      taskDiv.remove();

      // Save updated tasks to localStorage
      saveTasks();

      // Update task counts
      updateCounts();
    });

    // Append the task to the correct column based on its status
    document
      .querySelector(`.column[data-status="${task.status}"] .tasks-list`)
      .appendChild(taskDiv);
  }

  // Function to attach drag-and-drop behavior to a task
  function attachDragEvents(task){
    task.addEventListener("dragstart", () => {
      dragTask = task; // Store the dragged task
      task.classList.add("dragging"); // Add CSS class for visual feedback
    });

    task.addEventListener("dragend", () => {
      task.classList.remove("dragging"); // Remove visual feedback
      dragTask = null; // Clear the dragged task reference
    });
  }

  // Add drag-and-drop events to each column
  columns.forEach(column => {

    // Allow dropping by preventing default behavior
    column.addEventListener("dragover", e => e.preventDefault());

    // Highlight column when a draggable item enters
    column.addEventListener("dragenter", () => {
      column.classList.add("hover-over");
    });

    // Remove highlight when draggable item leaves
    column.addEventListener("dragleave", () => {
      column.classList.remove("hover-over");
    });

    // Handle dropping a task into the column
    column.addEventListener("drop", e => {
      e.preventDefault();
      if (!dragTask) return; // If no task is being dragged, do nothing

      const list = column.querySelector(".tasks-list");
      list.appendChild(dragTask); // Move task to the new column

      // Update task status in the array
      const taskId = Number(dragTask.dataset.id);
      const taskObj = tasks.find(t => t.id === taskId);

      if (taskObj){
        taskObj.status = column.dataset.status; // Update status
        saveTasks(); // Save updated tasks
      }

      column.classList.remove("hover-over"); // Remove highlight
      updateCounts(); // Update task counts
    });
  });

  // Function to update task counts for each column
  function updateCounts(){
    columns.forEach(column => {
      const count = column.querySelectorAll(".task").length;
      column.querySelector(".count").textContent = count;
    });
  }

  // Function to save tasks array to localStorage
  function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

});




