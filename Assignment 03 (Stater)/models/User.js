'use strict'

// ============================
// Step 1: Define the `User` class
// ============================
class User {
    constructor(firstname, lastname, username, password, pageSize = 10, category = "business") {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.pageSize = pageSize;
        this.category = category;

        //thuộc tính thêm vào để làm yêu cầu 9
        this.pageSize = pageSize;
        this.category = category;
    }
}

class Task {
    constructor(task, owner, isDone = false) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}

