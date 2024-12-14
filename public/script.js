const API_URL = 'http://localhost:3000/tasks';

// Fetch and display all tasks
async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.status === 'completed' ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title} - ${task.description}</span>
            <div>
                <button class="complete" onclick="toggleTaskStatus(${task.id}, '${task.status}')">
                    ${task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    fetchTasks();
});

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Toggle task status
async function toggleTaskStatus(id, currentStatus) {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
}

// Initial load
fetchTasks();
