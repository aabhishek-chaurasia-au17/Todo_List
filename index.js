
const input_block = document.querySelector('#input-block')
const inputTaskBox = document.querySelector('#inputBox')
const addtaskBtn = document.querySelector('#addBtn')
const validtext = document.querySelector("#valid-text")
const todo_list = document.querySelector(".todo-list")
const todocompleted = document.querySelector(".todo-done-list")
const todoDeleted = document.querySelector(".todo-delete-list")

let tasks = []
let completeTodo = []
let deletedTodo = []

function onClickGetTask() {
    const task = inputTaskBox.value

    if(!task){
        inputTaskBox.classList.add('is-invalid')
    }else{
        inputTaskBox.classList.remove('is-invalid')
        addTasks(task) 
        renderTodos() 
    }
}

function addTasks(task) {
    const todo = task
    tasks.push({
        task : todo,
        createdOn: new Date()
    })
}

function renderTodos() {
    todo_list.innerHTML = ''

    tasks.forEach((item, index) => {
        todo_list.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
        <div class="col-10 d-flex align-items-center"><b>${item.task } </b> created at ${ item.createdOn}</div>
        <div class="col-1"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
        <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item item-icon"><i class="bi bi-x-circle"></i></button></div></div>
        </li>`);
    });

}

function deleteTodo(itemIndex){
    deletedTodo.push({ ...tasks[itemIndex] })
    tasks = tasks.filter((_, index) => index !== itemIndex)
    renderTodos()
    showDeletedTodo()
}

function completedTodo(itemIndex) {
    completeTodo.push({ ...tasks[itemIndex] }  )
    tasks = tasks.filter((_, index) => index !== itemIndex)
    renderTodos()
    showCompletedTodo()
}


function showCompletedTodo() {
    completeTodo.forEach((item, index) => {
        todocompleted.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
        <div class="col-10 d-flex align-items-center"><b>${item.task} </b> created at ${item.createdOn}</div>
        </div></li>`);
    });
}


function showDeletedTodo() {
    deletedTodo.forEach((item, index) => {
        todoDeleted.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
        <div class="col-10 d-flex align-items-center"><b>${item.task} </b> created at ${item.createdOn}</div>
        </div></li>`);
    });
}
