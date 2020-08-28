let doneTasksNo = 0;
let totalTasksNo = 0;
let newTask;
let newTaskText = "";

const doneTasks = document.querySelector("#completed");
const totalTasks = document.querySelector("#total");

const app = document.querySelector("#app");

const taskContainer = app.querySelector(".container");

const input = document.querySelector("#task-to-add");
const button = document.querySelector(".button");


const storeTaskStats = (doneTasksNo, totalTasksNo) => {
    console.log(doneTasksNo)
    localStorage.setItem("doneTasksNumber", JSON.stringify(doneTasksNo));
    localStorage.setItem("totalTasksNumber", JSON.stringify(totalTasksNo));
}

const getTaskStatsfromStore = () => {
    console.log(localStorage)
    if(JSON.parse(localStorage.getItem("totalTasksNumber"))) {
        doneTasksNo = JSON.parse(localStorage.getItem("doneTasksNumber"));
        totalTasksNo = JSON.parse(localStorage.getItem("totalTasksNumber"));
    }
    showTaskStats();
} 

const storeTask = () => {
    localStorage.setItem("tasks", JSON.stringify(taskContainer.innerHTML));
}

const getTasksfromStore = () => {
    if(localStorage.getItem("tasks")) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        renderTasksfromStore(tasks);
    }
}

const renderTasksfromStore = (tasks) => {
    taskContainer.innerHTML = tasks;
    for (child of taskContainer.children) {
        child.children[0].onclick = (e) => changeTaskStatus(e);
        child.children[2].onclick = (e) => confirm("Opravdu chceš úkol smazat?") ? (removeTask(e), storeTask()) : "";
    }
}

const showTaskStats = () => {
    console.log(totalTasksNo)
    doneTasks.innerHTML = doneTasksNo > 9 ? doneTasksNo : `0${doneTasksNo}`;
    totalTasks.innerHTML = totalTasksNo > 9 ? totalTasksNo :`0${totalTasksNo}`;
    console.log(totalTasksNo)
    storeTaskStats(doneTasksNo, totalTasksNo);
}


const createNewTask = () => {
    newTask = taskContainer.querySelector(".task-template").cloneNode(true);
    newTask.classList.remove("task-template");
    newTask.querySelector("p").innerHTML = newTaskText;
    newTask.querySelector(".not-done").onclick = e =>{
        changeTaskStatus(e);
    }

    newTask.querySelector(".far").onclick = e =>{
        confirm("Opravdu chceš úkol smazat?") ? (removeTask(e), storeTask()) : "";
    }
}

const addTask = () => {
    createNewTask();
    taskContainer.appendChild(newTask);
    storeTask(newTask);
    totalTasksNo++;
    showTaskStats();
}

const changeTaskStatus = e => {
    e.target.classList.contains("done") ?
        
    (e.target.classList.remove("done"), doneTasksNo--)
    :
    (e.target.classList.add("done"), doneTasksNo++)

    showTaskStats();
}

const removeTask = e => {
    e.target.parentElement.remove();
}

button.onclick = e => {
    e.preventDefault();
    input.value ? addTask() : alert("Nejdříve napiš úkol.")
    input.value = "";
}

input.onkeyup = e => {
    newTaskText = e.target.value;
    if (e.keyCode == 13) {
        e.target.value ? addTask() : alert("Nejdříve napiš úkol.")
        e.target.value = ""
    }

}

const init = ( ) => {
    getTaskStatsfromStore();
    getTasksfromStore();
    console.log("App initiated");
}

init();
