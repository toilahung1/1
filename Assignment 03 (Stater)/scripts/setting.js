'use strict'; 

document.addEventListener("DOMContentLoaded", function () {
    // Restore userActive from localStorage if available, otherwise create a default object
    let userActive = JSON.parse(localStorage.getItem("userActive")) || { username: "", pageSize: 10, category: "General" };
    let userArr = JSON.parse(localStorage.getItem("userArr")) || [];

    // Check if the user is logged in
    if (userActive && userActive.username) {
        const inputPageSize = document.getElementById('input-page-size');
        const inputCategory = document.getElementById('input-category');
        const btnSubmit = document.getElementById('btn-submit');

        if (!inputPageSize || !inputCategory || !btnSubmit) {
            console.error("Required DOM elements not found!");
            return;
        }

        // Set initial values in the input fields if available
        inputPageSize.value = userActive.pageSize || 10;
        inputCategory.value = userActive.category || "General";

        // Listen for click event on the submit button
        btnSubmit.addEventListener('click', function () {
            if (validate()) {
                // Update userActive information
                userActive.pageSize = Number.parseInt(inputPageSize.value);
                userActive.category = inputCategory.value;

                // Save userActive back to localStorage
                localStorage.setItem("userActive", JSON.stringify(userActive));
                console.log("userActive saved to localStorage:", userActive); // Check in the console

                // Update information in userArr
                const index = userArr.findIndex((userItem) => userItem.username === userActive.username);
                if (index !== -1) {
                    userArr[index] = userActive;
                    localStorage.setItem("userArr", JSON.stringify(userArr));
                    console.log("userArr saved to localStorage:", userArr); // Check in the console
                }

                // Notify user of successful settings update and reset form
                alert("Settings saved successfully!");
                inputPageSize.value = "";
                inputCategory.value = "General";
            }
        });

        // Function to validate user input
        function validate() {
            let isValid = true;

            // Check page size (News per page)
            const pageSizeValue = Number.parseInt(inputPageSize.value);
            if (isNaN(pageSizeValue) || pageSizeValue <= 0) {
                alert("Invalid news per page value!");
                isValid = false;
            }

            // Check category
            if (!inputCategory.value.trim()) {
                alert("Please select a category!");
                isValid = false;
            }

            return isValid;
        }

    } else {
        // If userActive doesn't exist (user is not logged in)
        alert("Please log in / Register to access the app");
        window.location.assign("../index.html");
    }
});
