'use strict'; // Retrieve `userActive` from localStorage if not already set.
if (!userActive) {
    userActive = JSON.parse(localStorage.getItem('userActive')); // Retrieve value from localStorage if needed
    if (!userActive) {
        alert("No user logged in.");
        window.location.assign("../index.html");
    }
}

const newContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

let currentPage = 1; // Default starting page
let totalResults = 0; // Total results for pagination

// Get parameters from `userActive`, default to 'business' and 5 news per page
let category = userActive.category || 'business';
let pageSize = userActive.pageSize || 5; // Default 5 news per page

// Log category and pageSize to console
console.log("Category: ", category);
console.log("Page Size: ", pageSize);

// Fetch initial news data
getDataNews("us", currentPage);

// Function to fetch news data from NewsAPI and display it
async function getDataNews(country, page) {
    try {
        const res = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apikey=3fd06ff8da3a428aa72a56e71a6419ec`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch news data.");
        }

        const data = await res.json();

        // Check and log the entire API response
        console.log("API response:", data);

        // Check for errors or no articles found
        if (data.status === "error" || !data.articles || data.articles.length === 0) {
            throw new Error("No articles found.");
        }

        // Call function to display the list of news
        displayNewList(data);
    } catch (err) {
        console.error("Error:", err);
        alert("Error: " + err.message);
    }
}

// Function to display the list of news on the page
function displayNewList(data) {
    totalResults = data.totalResults; // Update total results
    checkBtnPrev();
    checkBtnNext();

    let html = "";

    // Iterate over all articles and create HTML
    data.articles.forEach(function (article) {
        html += `
            <div class="card flex-row flex-wrap">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/150'}" class="card-img" alt="${article.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description}</p>
                                <a href="${article.url}" class="btn btn-primary" target="_blank">View</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Display news in the container
    newContainer.innerHTML = html;
}

// Check if 'Previous' button should be disabled
function checkBtnPrev() {
    // Hide 'Previous' button if on the first page
    btnPrev.style.display = currentPage === 1 ? 'none' : 'inline-block';
}

// Check if 'Next' button should be disabled
function checkBtnNext() {
    const totalPages = Math.ceil(totalResults / pageSize); // Calculate total number of pages
    // Hide 'Next' button if on the last page
    btnNext.style.display = currentPage >= totalPages ? 'none' : 'inline-block';
}

// Event when 'Previous' button is clicked
btnPrev.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        pageNum.textContent = currentPage;
        getDataNews("us", currentPage);
    }
});

// Event when 'Next' button is clicked
btnNext.addEventListener('click', function () {
    const totalPages = Math.ceil(totalResults / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        pageNum.textContent = currentPage;
        getDataNews("us", currentPage);
    }
});
