// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayAuthenticationMessage(); // Always start with authentication message
});

// Function to authenticate the token
function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    
    if (token === expectedToken) {
        displayRandomVerse();
    } else {
        displayAuthenticationMessage();
    }
    // Clear the token after use to require re-authentication
    localStorage.removeItem('authToken');
    updateURLWithoutToken();
}

// Function to display authentication failure message
function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
    promptForToken(); // Function to prompt user for token input
}

// Function to display a random Bible verse
function displayRandomVerse() {
    fetch('verses.json') // Ensure this path is correct
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
            promptForToken(); // Prompt for new authentication after showing the verse
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
            promptForToken();
        });
}

// Function to prompt for token
function promptForToken() {
    const tokenInput = prompt("Please enter your authentication token to view a verse:");
    if (tokenInput) {
        authenticateToken(tokenInput);
    }
}

// Function to remove token from URL without reloading the page
function updateURLWithoutToken() {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.pushState({}, '', url);
}
