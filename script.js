// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
        clearURL(); // Clear the token from the URL after use
    } else {
        promptForToken(); // Always start by asking for a token
    }
});

// Function to authenticate the token and display a verse
function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    
    if (token === expectedToken) {
        displayRandomVerse();
    } else {
        alert("Authentication failed. Please enter a valid token.");
        promptForToken(); // Re-prompt for token on failure
    }
}

// Function to display a random Bible verse
function displayRandomVerse() {
    fetch('verses.json') // Ensure this path is correct
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        })
        .finally(() => {
            promptForToken(); // Prompt for a new token immediately after displaying a verse
        });
}

// Function to prompt for token
function promptForToken() {
    const tokenInput = prompt("Please enter your authentication token to view a verse:");
    if (tokenInput) {
        authenticateToken(tokenInput);
    } else {
        alert("Authentication required to access Bible verses.");
    }
}

// Function to clear the URL token parameter
function clearURL() {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.replaceState({}, document.title, url.pathname + url.search);
}
