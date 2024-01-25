document.addEventListener('DOMContentLoaded', function () {
    // Get elements from the DOM
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks from local storage
    tasks.forEach(task => displayTask(task));

    // Function to add a new task
    window.addTask = function () {
        const taskText = taskInput.value;

        if (taskText.trim() !== '') {
            const task = { text: taskText, completed: false };
            tasks.push(task);

            // Save tasks to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));

            displayTask(task);
            taskInput.value = '';
        }
    };

    // Function to display a task in the list
    function displayTask(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('complete');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function () {
            deleteTask(task);
        };

        li.appendChild(deleteBtn);
        li.onclick = function () {
            toggleComplete(task, li);
        };

        taskList.appendChild(li);
    }

    // Function to toggle task completion
    function toggleComplete(task, li) {
        task.completed = !task.completed;
        li.classList.toggle('complete');

        // Update tasks in local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to delete a task
    function deleteTask(task) {
        const taskIndex = tasks.indexOf(task);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            // Update tasks in local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Remove the task from the UI
        const liToDelete = Array.from(taskList.children).find(li => li.textContent === task.text);
        if (liToDelete) {
            taskList.removeChild(liToDelete);
        }
    }

    // Function to clear completed tasks
    window.clearCompleted = function () {
        const completedTasks = tasks.filter(task => task.completed);

        completedTasks.forEach(task => {
            const liToDelete = Array.from(taskList.children).find(li => li.textContent === task.text);
            if (liToDelete) {
                taskList.removeChild(liToDelete);
            }
        });

        // Update tasks in local storage
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
});
