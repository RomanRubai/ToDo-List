const input = document.querySelector(".message");
const addButton = document.querySelector(".add");
const deleteAllButton = document.querySelector(".delete_all");
const list = document.querySelector(".todo");

document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function (task) {
        addTaskToList(task.text, task.isImportant, task.isCompleted);
    });
});

addButton.addEventListener("click", function () {
    const taskText = input.value;
    if (taskText === "") return;
    addTaskToList(taskText);
    saveTasksToLocalStorage();
    input.value = "";
});

deleteAllButton.addEventListener("click", function () {
    list.innerHTML = "";
    saveTasksToLocalStorage();
});

function addTaskToList(taskText, isImportant, isCompleted) {
    const li = document.createElement("li");
    li.className = "todo_list_item" + (isImportant ? " important" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    li.appendChild(checkbox);

    const label = document.createElement("label");
    label.className = "task_text";
    label.appendChild(document.createTextNode(taskText));
    li.appendChild(label);

    const importantBtn = document.createElement("button");
    importantBtn.innerText = "Important";
    importantBtn.className = "important_button";
    li.appendChild(importantBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "delete_button";
    li.appendChild(deleteBtn);

    list.appendChild(li);

    checkbox.addEventListener("change", function () {
        saveTasksToLocalStorage();
    });

    label.addEventListener("click", function () {
        checkbox.checked = !checkbox.checked;
        saveTasksToLocalStorage();
    });

    importantBtn.addEventListener("click", function () {
        isImportant = !isImportant;
        importantBtn.innerText = "Important";
        li.classList.toggle("important", isImportant);
        saveTasksToLocalStorage();
    });

    deleteBtn.addEventListener("click", function () {
        list.removeChild(li);
        saveTasksToLocalStorage();
    });
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(list.children).map(function (li) {
        const label = li.querySelector("label");
        const checkbox = li.querySelector("input[type=checkbox]");
        const isImportant = li.classList.contains("important");
        const isCompleted = checkbox.checked;
        return {text: label.innerText, isImportant, isCompleted};
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}