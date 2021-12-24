
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
        setEmptyInput(task)
        addTasks(task) 
        renderTodos() 
    }
}

function onInputEnter() {
    inputTaskBox.onkeyup = function (e) {
    if (e.key === 'Enter') {
        addtaskBtn.click();
        }
    }
}
onInputEnter()


function setEmptyInput(task) {
    task = inputTaskBox.value = ""
}

function addTasks(task) {
    const todo = task
    tasks.push({
        task : todo,
        createdOn: new Date(),
        isDone: false,
    })
}

function renderTodos() {
    todo_list.innerHTML = ''

    tasks.forEach((item, index) => {
        if(tasks.isDone === true){
        todocompleted.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
            <div class="col-10 d-flex align-items-center"><b>${item.task} </b> created at ${ item.createdOn}</div></div>
        </li>`);
        }else{
        todo_list.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
            <div class="col-10 d-flex align-items-center"><b>${item.task} </b> created at ${ item.createdOn}</div>
            <div class="col-1"><button type="button" onclick="completedTodo(${index})" class="btn complete-item item-icon"><i class="bi bi-check2-circle"></i></button> </div>
            <div class="col-1"><button type="button" onclick="deleteTodo(${index})" class="btn delete-item item-icon"><i class="bi bi-x-circle"></i></button></div></div>
        </li>`)
        }
    });

}

function deleteTodo(itemIndex){
    tasks = tasks.filter((_, index) => index !== itemIndex)
    renderTodos()
}

function completedTodo(itemIndex) {
    tasks = tasks.filter((_, index) => index !== itemIndex)
    tasks.isDone = true
    renderTodos()
}
