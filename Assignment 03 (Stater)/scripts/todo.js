'use strict';

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

if (userActive) {
    const todoList = document.getElementById("todo-list");
    const btnAdd = document.getElementById("btn-add");
    const inputTask = document.getElementById("input-task");

    // Lấy dữ liệu từ localStorage khi trang tải
    let todoArr = getFromStorage("todoArr");

    // Hiển thị danh sách todo
    displayTodoList();

    // Hàm hiển thị danh sách todo
    function displayTodoList() {
        let html = "";

        // Chỉ hiển thị nhiệm vụ của người dùng hiện tại
        todoArr.filter((todo) => todo.owner === userActive.username).forEach(function (todo, idx) {
            html += `
            <li class="${todo.isDone ? "checked" : ""}" data-index="${idx}">
                ${todo.task}
                <span class="close">×</span>
            </li>
            `;
        });

        todoList.innerHTML = html;

        // Thêm sự kiện cho các nhiệm vụ và nút xóa
        addClickEventToTasks();
        eventDeleteTasks();
    }

    // Thêm nhiệm vụ mới khi nhấn nút
    btnAdd.addEventListener("click", function () {
        const taskText = inputTask.value.trim();

        // Nếu không nhập nhiệm vụ thì không thêm
        if (taskText.length === 0) {
            alert("Vui lòng nhập nhiệm vụ");
        } else {
            // Tạo một nhiệm vụ mới, mặc định isDone = false
            const todo = new Task(taskText, userActive.username, false);

            // Thêm nhiệm vụ mới vào todoArr
            todoArr.push(todo);

            // Lưu todoArr vào localStorage
            saveToStorage("todoArr", todoArr);

            // Render lại danh sách todo
            displayTodoList();

            // Reset trường nhập liệu
            inputTask.value = "";
        }
    });

    // Hàm thêm sự kiện cho mỗi task (li) để thay đổi trạng thái "checked"
    function addClickEventToTasks() {
        // Thay vì thêm sự kiện cho từng li, ta thêm cho todoList để xử lý tất cả nhiệm vụ
        todoList.addEventListener("click", function (e) {
            // Kiểm tra xem sự kiện có phải là click vào một phần tử <li> không phải nút "×"
            if (e.target.tagName === "LI" && !e.target.classList.contains("close")) {
                const liEl = e.target;  // Lấy phần tử li mà người dùng click

                // Toggle class 'checked'
                liEl.classList.toggle("checked");

                // Lấy index từ thuộc tính data-index
                const idx = parseInt(liEl.getAttribute("data-index"), 10);

                // Tìm task trong todoArr dựa trên index
                const todo = todoArr[idx+1]; // Sử dụng idx thay vì idx+1

                if (todo) {
                    // Cập nhật trạng thái isDone dựa trên class 'checked'
                    todo.isDone = liEl.classList.contains("checked");

                    // Lưu todoArr vào localStorage
                    saveToStorage("todoArr", todoArr);


                    // In ra log để kiểm tra trạng thái isDone
                    console.log(`Task '${todo.task}' isDone updated: ${todo.isDone}`);
                }
            }
        });
    }

    // Hàm xử lý sự kiện xóa task
    function eventDeleteTasks() {
        // Xử lý sự kiện click vào các nút "×" (xóa nhiệm vụ)
        todoList.querySelectorAll(".close").forEach(function (closeEl) {
            closeEl.addEventListener("click", function () {
                const isDelete = confirm("Bạn muốn xóa nhiệm vụ này?");
                let liText = closeEl.parentElement.textContent.trim();

                // Loại bỏ ký tự "×"
                if (liText.endsWith("×")) {
                    liText = liText.slice(0, liText.length - 1).trim();
                }

                // Nếu xác nhận xóa
                if (isDelete) {
                    const index = todoArr.findIndex(
                        (item) => item.owner === userActive.username && item.task === liText
                    );
                    if (index > -1) {
                        // Xóa nhiệm vụ trong todoArr
                        todoArr.splice(index, 1);

                        // Lưu lại todoArr vào localStorage
                        saveToStorage("todoArr", todoArr);

                        // Render lại danh sách todo
                        displayTodoList();
                    }
                }
            });
        });
    }

} else {
    alert("Vui lòng đăng nhập/ đăng ký để truy cập ứng dụng");
    window.location.assign("../index.html");
}
