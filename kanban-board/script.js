const todo = document.querySelector("#Todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task")

tasks.forEach(task => {
    task.addEventListener("drag" , (event)=>{
        // console.log("dragging" , event)
    })
});

progress.addEventListener("dragenter" , (event) =>{
// console.log("dragenter(progress) : " , event)
this.classlist.add("hover-over")
})