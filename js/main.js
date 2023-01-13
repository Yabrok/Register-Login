const localData = localStorage.getItem('token');
const logOutBtn = document.querySelector('.js-logout');

const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elList = document.querySelector('.js-list');

if (!localData) {
    location.replace('register.html');
}

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
})


// ======================================

function renderTodos(array, node) {
    node.innerHTML = '';
    array.forEach((item) => {
        node.innerHTML += `
        <li class='d-flex align-items-center justify-content-between list-group-item'>
            <span>${item.todo_value}</span>
            <div>
                <button data-todo-id=${item.id} class="btn btn-warning todo-edit" type="button">Edit</button>
                <button data-todo-id=${item.id} class="btn btn-danger todo-delete" type="button">Delete</   button>
            </div>
        </li>
        `
    });
}

// ====================================

async function getTodos() {
    const res = await fetch('http://192.168.0.109:5000/todo', {
        headers: {
            Authorization: localData
        }
    });
    const data = await res.json();
    renderTodos(data, elList)
}

getTodos()

// ================================================

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('http://192.168.0.109:5000/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localData
        },
        body: JSON.stringify({
            text: elInput.value
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                getTodos();
            }
        })
        .catch((err) => console.log(err))

    elInput.value = ''
})

const deleteTodo = (id) => {
    fetch(`http://192.168.0.109:5000/todo/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: localData
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                getTodos();
            }
        })
        .catch((err) => console.log(err))
}

const editTodo = (id) => {
    const editedTodo = prompt('Edit:',)
    fetch(`http://192.168.0.109:5000/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localData
        },
        body: JSON.stringify({
            text: editedTodo
        })
    })
        .then((res) => res.json())
        .then((data) => {
            if(data){
                getTodos()
            }
        })
        .catch((err) => console.log(err))
}

elList.addEventListener('click', (evt) => {
    if (evt.target.matches('.todo-delete')) {
        const todoId = evt.target.dataset.todoId;
        deleteTodo(todoId);
    }
    if (evt.target.matches('.todo-edit')) {
        const todoId = evt.target.dataset.todoId;
        editTodo(todoId);
    }
})