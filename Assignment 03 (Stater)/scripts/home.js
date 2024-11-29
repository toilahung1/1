'use strict'

// Get necessary elements
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Function to display home content depending on the user status
function displayHome() {
    // If there's a user logged in (i.e., userActive is not null)
    if (userActive) {
        loginModal.style.display = "none";
        mainContent.style.display = "block";

        // Set welcome message for logged-in user
        welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
    } else {
        // If no user is logged in, show login modal and hide main content
        loginModal.style.display = "block";
        mainContent.style.display = "none";
    }
}

// Call the displayHome function to update the UI
displayHome();

// Logout button functionality
btnLogout.addEventListener("click", function () {
    const isLogout = confirm("Are you sure you want to logout?");
    
    if (isLogout) {
        // Set userActive to null to indicate no user is logged in
        userActive = null;

        // Update localStorage
        saveToStorage("userActive", userActive);

        // Update the UI
        displayHome();  // Re-run the function to show the updated UI
    }
});
