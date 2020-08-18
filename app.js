// selector

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOpt = document.querySelector('.filter-todo');

// EventListener
document.addEventListener('DOMContentLoaded',getTodo);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOpt.addEventListener('click', filterTodo);

// functions

function addTodo(event){
    //prevet reload
    event.preventDefault();
    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    //append
    todoDiv.appendChild(newTodo);
    //local
    saveLocal(todoInput.value);
    //check
    const compltBtn = document.createElement('button');
    compltBtn.innerHTML = `<i class="fas fa-check"></i>`;
    compltBtn.classList.add('complete-btn');
    todoDiv.appendChild(compltBtn);
    //trash
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    //append to list
    todoList.appendChild(todoDiv);
    //set todo to amptey
    todoInput.value = "";
};

function deleteCheck(e){
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');

        removeLocal(todo);

        //transitionEnd
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    };
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }                   
            break;
            }
    });
}

function saveLocal(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodo(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }    
    todos.forEach(function(todo){
    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');
    //append
    todoDiv.appendChild(newTodo);
    //check
    const compltBtn = document.createElement('button');
    compltBtn.innerHTML = `<i class="fas fa-check"></i>`;
    compltBtn.classList.add('complete-btn');
    todoDiv.appendChild(compltBtn);
    //trash
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    //append to list
    todoList.appendChild(todoDiv);        
    });
}

function removeLocal(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}