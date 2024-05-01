// Function to handle NFC card authentication and fetch verse data
function authenticateAndFetchVerses() {
    console.log("Attempting to authenticate...");

    // Extract token from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    console.log("Token from URL: ", token);

    // Define the expected token - replace it with your actual expected token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";

    if (token === expectedToken) {
        console.log("Authentication successful");
        // Store token in sessionStorage
        sessionStorage.setItem('authToken', token);
        fetchVerses();
    } else {
        console.log("Authentication failed");
        document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
    }
}

// Function to fetch verse data from a JSON file
function fetchVerses() {
    console.log("Fetching verses...");
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
        console.log("No authentication token found.");
        document.getElementById('verseDisplay').innerHTML = "Authentication token not found. Please authenticate again.";
        return;
    }

    // Replace 'verses.json' with the path to your actual JSON file
    fetch('verses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayRandomVerse(data))
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

// Function to display a random verse from the fetched data
function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

// Event listener for the DOMContentLoaded event to ensure script runs after document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded. Running authentication process...");
    authenticateAndFetchVerses();
});

// Event listener for the beforeunload event to ensure session storage is cleared when the page is refreshed or closed
window.addEventListener('beforeunload', () => {
    console.log("Clearing session storage...");
    sessionStorage.removeItem('authToken');
});
