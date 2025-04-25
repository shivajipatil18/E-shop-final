
interface Todo {
    id: number;
    text: string;
}

let todos: Todo[] = [];

function addTodo() {
    const inputElement = document.getElementById("todoInput") as HTMLInputElement;
    const text = inputElement.value.trim();
    if (text !== "") {
        const newTodo: Todo = { id: Date.now(), text };
        todos.push(newTodo);
        inputElement.value = "";
        renderTodos();
    }
}

function removeTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const listElement = document.getElementById("todoList") as HTMLUListElement;
    listElement.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        const button = document.createElement("button");
        button.textContent = "X";
        button.onclick = () => removeTodo(todo.id);
        li.appendChild(button);
        listElement.appendChild(li);
    });
}