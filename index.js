
const inputTaskBox = document.querySelector('#inputBox')
const addtaskBtn = document.querySelector('#addBtn')
const validtext = document.querySelector("#valid-text")
const todo_list = document.querySelector(".todo-list")
const todocompleted = document.querySelector(".todo-done-list")

let tasks = []

onInputEnter()

function addtodo() {
    let task = inputTaskBox.value
     
    if(!task){
        inputTaskBox.classList.add('is-invalid')
    }else{
        inputTaskBox.classList.remove('is-invalid')
        setEmptyInput()
        tasks.push({
            task,
            createdOn: createDate(),
            isDone: false
        })
        renderTodos() 
    }
}

function createDate() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]

    return `${day}/${month}/${year} at ${hour}:${minutes}:${seconds}`
}

function onInputEnter() {
    inputTaskBox.onkeyup = function (e) {
    if (e.key === 'Enter') {
        addtodo();
        }
    }
}

function setEmptyInput() {
    inputTaskBox.value = ""
}

function renderTodos() {
    todo_list.innerHTML = ""
    todocompleted.innerHTML = ""

    function showTask(item, index) {
       return `<li class="item list-group-item my-1"> <div class="row">
            <div class="col-9 d-flex align-items-center"><b class="col-2 edit_text">${item.task} </b> <span class="col-10 text-center"> ${item.createdOn} </span></div>
            <div class="col-1"><button type="button" onclick="editodo(${index})" class="btn complete-item item-icon"><i class="bi bi-pencil-square"></i></button> </div>
            <div class="col-1"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
            <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item text-danger item-icon"><i class="bi bi-x-circle"></i></button></div></div>
        </li>`
    }

    let tasksHtmlList = "";
    let completTaskHtmlList = "";
    
    tasks.forEach((item, index) => {
        if(item.isDone === true){
            let htmlCode = showTask(item, index)
            completTaskHtmlList += htmlCode
        }else{
            let htmlCode = showTask(item, index)
            tasksHtmlList += htmlCode
        }
    });

    todo_list.innerHTML = tasksHtmlList
    todocompleted.innerHTML = completTaskHtmlList
}

function deleteTodo(itemIndex){
    tasks = tasks.filter((_, index) => index !== itemIndex)
    renderTodos()
}

function completedTodo(itemIndex) {
    const task = tasks[itemIndex] 
    task.isDone = true 
    tasks[itemIndex] = task

    renderTodos()
}

function editodo(itemIndex) {
    const task = tasks[itemIndex] 
    let a = document.querySelector(".edit_text")
    a.contentEditable = "true";
    task.task = a
    console.log(task.task = a);
    tasks[itemIndex] = task
}