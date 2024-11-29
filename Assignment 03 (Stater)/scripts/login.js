'use strict';

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// Assuming userArr is already populated from localStorage (or you initialize it)
let userArr = JSON.parse(localStorage.getItem("userArr")) || [];

// Event listener for the login button
btnSubmit.addEventListener("click", function () {
    // Check if username and password are entered correctly
    const isValidate = validate();
    
    if (isValidate) {
        // Search for the user in the userArr array
        const user = userArr.find(
            (item) => 
                item.username === inputUsername.value &&
                item.password === inputPassword.value
        );

        if (user) {
            alert("Đăng nhập thành công");
            // Save the current logged-in user to localStorage
            saveToStorage("userActive", user);
            // Redirect to the homepage or dashboard
            window.location.assign("../index.html");
        } else {
            alert("Thông tin đăng nhập chưa đúng, xin vui lòng kiểm tra lại");
        }
    }
});

// Validate the input fields
function validate() {
    let isValidate = true;
    
    // Check if the username is empty
    if (inputUsername.value === "") {
        alert("Vui lòng nhập username");
        isValidate = false;
    }

    // Check if the password is empty
    if (inputPassword.value === "") {
        alert("Vui lòng nhập password");
        isValidate = false;
    }

    return isValidate;
}

// Function to save data to localStorage
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
