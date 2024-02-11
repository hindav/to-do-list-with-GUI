const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})


function getFormattedTimestamp() {
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

function addTodo() {
    const inputValue = document.getElementById('input').value;

if (inputValue.trim() !== '') {
    const ul = document.getElementById('todos');
    const li = document.createElement('li');

      // Create a span for the timestamp
    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = getFormattedTimestamp();

    li.innerHTML = `${inputValue} `;
    li.appendChild(timestampSpan);

    ul.appendChild(li);

    document.getElementById('input').value = '';

      // Add event listeners for left and right clicks
    li.addEventListener('click', toggleCompleted);
    li.addEventListener('contextmenu', deleteTodo);

      // Prevent the context menu from appearing on right-click
    li.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    });
    }
} 
  // Event listener for form submission
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});  

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

