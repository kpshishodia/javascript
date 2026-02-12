// =================== SELECT ELEMENTS =================== //
const todo = document.querySelector("#Todo");        // "To Do" column
const progress = document.querySelector("#progress"); // "In Progress" column
const done = document.querySelector("#done");        // "Done" column
const taskslist = document.querySelectorAll(".tasks-list");    // all task elements

let dragTask = null; // variable to store the currently dragged task

// =================== TASK DRAG EVENTS =================== //
taskslist.forEach(task => {
    // This event triggers while the task is being dragged
    task.addEventListener("drag", (event) => {
        // Store the reference of the currently dragged task
        dragTask = task;
        // console.log("dragging", event)
    });
    
    // Optionally, you can use dragstart / dragend for better control
    task.addEventListener("dragstart", () => {
        dragTask = task; // store dragged task
        task.classList.add("dragging"); // optional: add class for styling
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("dragging"); // remove class after drop
        dragTask = null; // clear the dragged task
    });
});

// =================== FUNCTION TO ADD DRAG EVENTS ON A COLUMN =================== //
function addDradEventsOnColumn(column) {
    
    // Fired when a draggable element enters the column
    column.addEventListener("dragenter", (event) => {
        event.preventDefault(); // necessary to allow drop
        column.classList.add("hover-over"); // add hover effect
    });

    // Fired when a draggable element leaves the column
    column.addEventListener("dragleave", (event) => {
        event.preventDefault();
        column.classList.remove("hover-over"); // remove hover effect
        // Note: dragleave can fire when moving over children, may need bounding box check
    });

    // Fired repeatedly while dragging over the column
    column.addEventListener("dragover", (event) => {
        event.preventDefault(); // necessary to allow drop
    });

    // Fired when the task is dropped in the column
    column.addEventListener("drop", (event) => {
        event.preventDefault();
        console.log("dropped", event); // debug
        console.log("dropTask:", dragTask, column); // debug
        
        // TODO: move dragTask into column.task-list
        // column.querySelector(".task-list").appendChild(dragTask);
        // column.classList.remove("hover-over"); // remove hover after drop
    });
}

// =================== APPLY DRAG EVENTS TO ALL COLUMNS =================== //
addDradEventsOnColumn(todo);
addDradEventsOnColumn(progress);
addDradEventsOnColumn(done);
