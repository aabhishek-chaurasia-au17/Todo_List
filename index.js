
const input_block = document.querySelector('#input-block')
const inputTaskBox = document.querySelector('#inputBox')
const addtaskBtn = document.querySelector('#addBtn')
const validtext = document.querySelector("#valid-text")
const todo_list = document.querySelector(".todo-list")
// const delete_item = querySelector('.delete-item')
const todoComplited = document.querySelector(".todo-done-list")


let tasks = []
// let completeTodo = []

function getTask() {
    addBtn.addEventListener('click', onClickGetTask)
}

function onClickGetTask() {
      const task = inputTaskBox.value
      if(!task){
        inputTaskBox.style.borderColor = "red";
        validtext.setAttribute("style", "display:block")
      }else{
          inputTaskBox.style.border = "none"; 
          validtext.setAttribute("style", "display:none")
          addTasks(task) 
          printTodos()
      } 
}   

function addTasks(task) {
    const todo = task
    tasks.push({
        task : todo,
        createdOn: new Date()
    })
}

function printTodos() {
    // const task_el = document.createElement("li");
    // todo_list.appendChild(task_el);
    // task_el.classList.add(`list-group-item`)
    // task_el.classList.add(`mt-1`)
    
    // for (let i = 0; i < tasks.length; i++) {
    //     task_el.innerText = tasks[i].task;
    // }
    todo_list.innerHTML = ''

    tasks.forEach((item) => {
        todo_list.insertAdjacentHTML('beforeend', `<li class="item list-group-item my-1"> <div class="row">
        <div class="col-10"><b>${item.task}</b> created at ${item.createdOn}</div>
        <div class="col-1"><a href="#" class="complete-item mx-2 item-icon"><i class="bi bi-check2-circle"></i></a> </div>
        <div class="col-1"><a href="#" class="delete-item item-icon"><i class="bi bi-x-circle"></i></a></div></div>
        </li>` );

        deleteTodo(item)
    });
}

function deleteTodo(itemName){
    const items = todo_list.querySelectorAll('.item');
    
    console.log(tasks);
        items.forEach((item) => {
            item.querySelector('.delete-item').addEventListener('click', function(){
            todo_list.removeChild(item)
            tasks = tasks.filter((item) => {
                return item !== itemName
            })
        })
    })
}
// function complitedTodo() {
    
// }


getTask()