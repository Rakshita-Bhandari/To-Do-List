document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task === "") return;

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = task;

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);

  input.value = "";
  saveTasks();
}

function saveTasks() {
  const list = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", list);
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) document.getElementById("taskList").innerHTML = saved;

  // Re-bind delete buttons and click event
  document.querySelectorAll("#taskList li").forEach((li) => {
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button.delete-btn").onclick = () => {
      li.remove();
      saveTasks();
    };
  });
}
