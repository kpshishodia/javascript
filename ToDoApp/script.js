const todoInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn");
const toDoList = document.getAnimations("todo-list");


let tasks = [];

addTaskBtn.addEventListener("click" , function (){
    let taskinputValue = todoInput.value.trim().toLowerCase()
    // console.log(taskinputValue) 
    if(taskinputValue == "") return

    const newTask ={
        id : Date.now(),
        text : taskinputValue,
        completed : false
    }

    tasks.push(newTask)

    todoInput.value = ""
})

console.log(tasks)

