
const inputTaskBox = document.querySelector('#inputBox')
const addtaskBtn = document.querySelector('#addBtn')
const validtext = document.querySelector("#valid-text")
const todo_list = document.querySelector(".todo-list")
const todocompleted = document.querySelector(".todo-done-list")

let tasks = []

function addtodo() {
    let task = inputTaskBox.value
     
    if(!task){
        inputTaskBox.classList.add('is-invalid')
    }else{
        inputTaskBox.classList.remove('is-invalid')
        setEmptyInput()
        tasks.push({
            task,
            createdOn: creatDate(),
            isDone: false
        })
        renderTodos() 
    }
}

function creatDate() {
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
onInputEnter()


function setEmptyInput() {
    inputTaskBox.value = ""
}

function renderTodos() {
    todo_list.innerHTML = ""
    todocompleted.innerHTML = ""

    function showTask(item, index) {
       let sethtmlCode = `<li class="item list-group-item my-1"> <div class="row">
            <div class="col-10 d-flex align-items-center"><b class="col-2">${item.task} </b> <span class="col-10 text-center"> ${item.createdOn} </span></div>
            <div class="col-1"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
            <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item text-danger item-icon"><i class="bi bi-x-circle"></i></button></div></div>
        </li>`
        return sethtmlCode;
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
