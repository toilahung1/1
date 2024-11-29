'use strict'
// ============================
// Step 2: Helper functions for localStorage
// ============================

// Function to get data from localStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Function to save data to localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ============================
// Step 3: Parse functions for converting plain objects to class instances
// ============================

// Function to convert plain user objects to User class instances
function parseUser(userData) {
    return new User(  // Use 'User' class instead of 'Users'
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pageSize,
        userData.category
    );
}

// Function to convert plain task objects to Task class instances
function parseTask(taskData) {
    return new Task(taskData.task, taskData.owner, taskData.isDone);
}

// ============================
// Step 4: Fetch data from localStorage
// ============================

// Lấy dữ liệu từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
const UserArr = users.map((user) => parseUser(user));

// Kiểm tra nếu userActive có trong localStorage
let userActive = getFromStorage("userActive") ? parseUser(getFromStorage("userActive")) : null;

// Kiểm tra nếu userActive chưa được khởi tạo, có thể là do người dùng chưa đăng nhập
if (!userActive) {
    console.log("No active user found.");
    // Bạn có thể chuyển hướng hoặc thực hiện các hành động khác nếu không có userActive
}

// Các nhiệm vụ
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
const todoArr = todos.map((todo) => parseTask(todo));

// ============================
// Step 5: Example Usage
// ============================

console.log(UserArr);  // Prints array of User class instances
console.log(userActive); // Prints the active user or null


///////////////////////////////////////////////////
// Function: Convert plain object to Class Instance
function parseUser(userData) {
    const user = new User(  // Corrected class name here
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pageSize,
        userData.category,
    );

    return user;
}

//////////////////////////////////////////////////
// Function to convert plain task object to Task class instance
function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone);

    return task;
}
