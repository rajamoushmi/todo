const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addBtn = document.getElementById('add-btn');
const clearAllBtn = document.getElementById('clear-all');

// Load tasks from localStorage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
        addDeleteButtonListeners();
    }
    updateButtonStates();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', listContainer.innerHTML);
    updateButtonStates();
}

// Add new task
function addTask() {
    if (inputBox.value === '') {
        alert('Please write something!');
        return;
    }

    // Create new list item
    const li = document.createElement('li');
    li.className = 'new-item';
    li.innerHTML = `
        <span class="task-emoji">🔹</span>
        <span class="todo-text">${inputBox.value}</span>
        <button class="delete-btn">❌</button>
    `;

    // Add click event for marking as checked
    li.addEventListener('click', function(e) {
        if (e.target !== this.querySelector('.delete-btn')) {
            this.classList.toggle('checked');
            saveTasks();
        }
    });

    // Add delete button functionality
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.classList.add('slideOut');
        setTimeout(() => {
            li.remove();
            saveTasks();
        }, 300);
    });

    // Add to list
    listContainer.insertBefore(li, listContainer.firstChild);
    
    // Clear input
    inputBox.value = '';
    inputBox.focus();
    
    // Save to localStorage
    saveTasks();
}

// Clear all tasks
function clearAll() {
    if (listContainer.children.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all tasks?')) {
        const items = listContainer.querySelectorAll('li');
        items.forEach(item => {
            item.classList.add('slideOut');
        });
        
        setTimeout(() => {
            listContainer.innerHTML = '';
            saveTasks();
        }, 300);
    }
}

// Update button states
function updateButtonStates() {
    const totalItems = listContainer.querySelectorAll('li').length;
    clearAllBtn.disabled = totalItems === 0;
    clearAllBtn.textContent = `Clear All (${totalItems})`;
}

// Add delete button listeners
function addDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const li = this.parentElement;
            li.classList.add('slideOut');
            setTimeout(() => {
                li.remove();
                saveTasks();
            }, 300);
        });
    });
}

// Event Listeners
addBtn.addEventListener('click', addTask);
clearAllBtn.addEventListener('click', clearAll);

inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load saved tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add click events to existing list items
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveTasks();
    }
}); 