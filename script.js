// Function to handle NFC card authentication and fetch verse data
function authenticateAndFetchVerses() {
    console.log("Authenticating...");
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    if (token) {
        // Clear the token from the URL
        window.history.replaceState(null, null, window.location.pathname);
    }

    console.log("Token from URL:", token);

    // Define the expected token - replace with your actual token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token && token === expectedToken) {
        console.log("Authentication successful");
        sessionStorage.setItem('authToken', token);
        fetchVerses();
    } else {
        console.log("Authentication failed");
        document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
    }
}

function fetchVerses() {
    console.log("Fetching verses...");
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        console.log("No authentication token found.");
        document.getElementById('verseDisplay').innerHTML = "Authentication token not found. Please authenticate again.";
        return;
    }

    fetch('verses.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => displayRandomVerse(data))
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded. Running authentication process...");
    authenticateAndFetchVerses();
});
