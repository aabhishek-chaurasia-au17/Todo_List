
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
    return moment().fromNow()
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
            <div class="col-9 d-flex align-items-center">
            <b class="col-4 edit_text${index}">${item.task}</b>
            <div class="input-group mb-3 d-none edit-box${index}" id="editInput">
                <input type="text" class="form-control" id="newEditText" value="${item.task}" placeholder="Add Task">
                <button class="btn btn-outline-secondary" type="button" onclick="saveOnEdit(${index})" id="button-addon2">Save</button>
            </div> 
            
            <span class="col-4 text-center"> ${item.createdOn} </span>
            </div>
            <div class="col-1"><button type="button" onclick="editodo(${index})" class="btn complete-item item-icon"><i class="bi bi-pencil-square"></i></button> </div>
            <div class="col-1"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
            <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item text-danger item-icon"><i class="bi bi-x-circle"></i></button></div></div>
        </li>`
    }

    let tasksHtmlList = "";
    let completTaskHtmlList = "";
    
    tasks.forEach((item, index) => {
        const {isDone} = item || {}
        let htmlCode = showTask(item, index)

        if(isDone){
            completTaskHtmlList += htmlCode
        }else{
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
    const editTextBox = document.querySelector(`.edit_text${itemIndex}`)
    editTextBox.classList.add('d-none')
    const editInputBox = document.querySelector(`.edit-box${itemIndex}`)
    editInputBox.classList.remove('d-none')   
}


function saveOnEdit(itemIndex){
    
    const editInputBox = document.querySelector(`.edit-box${itemIndex} input`)
    const updatedTask = editInputBox.value
    tasks[itemIndex].task = updatedTask
    renderTodos()   
    
}