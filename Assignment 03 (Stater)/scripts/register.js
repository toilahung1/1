'use strict'

// Get data from localStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Initialize userArr from localStorage (or empty array if not found)
const userArr = getFromStorage("userArr") || [];  // Ensure userArr is defined globally

// Initialize input elements
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");


// Validate the user input during registration
function validate(user, userArr) {
    let isValid = true;

    // 1. Ensure no field is left empty
    if (user.firstname.trim().length === 0) {
        alert("Please enter your First Name!");
        isValid = false;
    }

    if (user.lastname.trim().length === 0) {
        alert("Please enter your Last Name!");
        isValid = false;
    }

    if (user.username.trim().length === 0) {
        alert("Please enter your Username!");
        isValid = false;
    }

    if (user.password.trim().length === 0) {
        alert("Please enter your Password!");
        isValid = false;
    }

    // 2. Ensure username is unique
    if (userArr.some(item => item.username === user.username)) {
        alert("Username already exists. Please choose another one!");
        isValid = false;
    }

    // 3. Ensure password and confirm password match
    if (user.password !== inputPasswordConfirm.value) {
        alert("Password and Confirm Password must match!");
        isValid = false;
    }

    // 4. Ensure password is longer than 8 characters
    if (user.password.length <= 8) {
        alert("Password must be more than 8 characters!");
        isValid = false;
    }

    return isValid;
}

// Handle form submission
btnSubmit.addEventListener("click", function () {
    // Get the data from input fields
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value
    );

    // Validate the data
    const isValid = validate(user, userArr);

    if (isValid) {
        // Add the new user to userArr
        userArr.push(user);

        // Save updated userArr to localStorage
        saveToStorage("userArr", userArr);

        alert("Registration successful!");

        // Redirect to login page
        window.location.assign("../pages/login.html");
    }
});
