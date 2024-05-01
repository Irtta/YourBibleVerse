// Function to handle NFC card authentication and fetch verse data
function authenticateAndFetchVerses() {
    // Extract token from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const token = params.token;

    // Compare token with expected shared token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g"; // Replace with your actual shared token
    if (token === expectedToken) {
        // Authentication successful, store token in sessionStorage
        sessionStorage.setItem('authToken', token);
        fetchVerses();
    } else {
        // Authentication failed, display error message
        document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
    }
}

// Function to fetch verse data from JSON file
function fetchVerses() {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
        // If authentication token is not found, display error message
        document.getElementById('verseDisplay').innerHTML = "Authentication token not found. Please authenticate again.";
        return;
    }
    
    fetch('verses.json') // Replace 'verses.json' with the path to your JSON file
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

// Function to display random verse
function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

// Call the authentication and verse fetch function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    authenticateAndFetchVerses();
});

// Event listener for page refresh and tab close to ensure clean session
window.addEventListener('beforeunload', () => {
    // Remove authentication token from sessionStorage
    sessionStorage.removeItem('authToken');
    console.log('Authentication token removed from sessionStorage');
});

