window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; //to exchange the data to and from the server. When receiving data from the web the data will always be a string
    const newTodoForm = document.querySelector('#new-form'); 


    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        displayTaskElement()
    })

    displayTaskElement()

})

//create a display task function where all the list items are displayed when the 'add task' button is clicked.
function displayTaskElement() { //function is called displayTaskElement
    const todoList = document.querySelector('#todoList');
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
    
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const date = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox'; //This is for the checkbox next to each list item
        input.checked = todo.done; //This is the action where the circle is done or not
        span.classList.add('checkthrough'); //This is when you checked the checkbox the strike goes through the list item
        
        date.classList.add('todo-date');
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        date.innerHTML = `<input type="date" value="${todo.date}" readonly>`;
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(date);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done'); //this is the part where you loop through if something is done
        }

        input.addEventListener('change', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add("done");
            } else {
                todoItem.classList.remove("done");
            }

            displayTaskElement()
        })

        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTaskElement()
            })
        })

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTaskElement()
        })
    })
}

function sortAlphabetically() {
    var list, i, switching, listitems, shouldSwitch;
    list = document.getElementById('todoList');
    switching = true;

    while (switching) {
        switching = false;
        listitems = list.getElementsByClassName('todo-item');

        for (i = 0; i < (listitems.length - 1); i++) {
            shouldSwitch = false;
            if (listitems[i].innerHTML.toLowerCase() > listitems[i + 1].innerHTML.toLocaleLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            listitems[i].parentNode.insertBefore(listitems[i + 1], listitems[i]);
            switching = true;
        }
    }
}






