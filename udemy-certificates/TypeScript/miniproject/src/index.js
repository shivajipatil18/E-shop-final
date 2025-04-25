var todos = [];
function addTodo() {
    var inputElement = document.getElementById("todoInput");
    var text = inputElement.value.trim();
    if (text !== "") {
        var newTodo = { id: Date.now(), text: text };
        todos.push(newTodo);
        inputElement.value = "";
        renderTodos();
    }
}
function removeTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
function renderTodos() {
    var listElement = document.getElementById("todoList");
    listElement.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.text;
        var button = document.createElement("button");
        button.textContent = "X";
        button.onclick = function () { return removeTodo(todo.id); };
        li.appendChild(button);
        listElement.appendChild(li);
    });
}
