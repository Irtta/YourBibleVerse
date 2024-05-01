// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there is a token in the URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    // If a token is present in the URL
    if (token) {
        // Attempt to authenticate the token
        authenticateToken(token);
    } else {
        // If no token is found in the URL, display authentication failure message
        displayAuthenticationMessage();
    }
});

// Function to authenticate the token
function authenticateToken(token) {
    // Expected authentication token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    
    // If the provided token matches the expected token
    if (token === expectedToken) {
        // Store authentication status in session storage
        sessionStorage.setItem('authenticated', 'true');

        // Redirect to clean URL (remove token from URL)
        redirectToCleanURL();
    } else {
        // If authentication fails, display authentication failure message
        displayAuthenticationMessage();
    }
}

// Function to display authentication failure message
function displayAuthenticationMessage() {
    // Display a message indicating authentication failure
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}

// Function to redirect to a clean URL (remove token from URL)
function redirectToCleanURL() {
    // Clean URL
    const cleanURL = "https://irtta.github.io/YourBibleVerse/";

    // Redirect to the clean URL
    window.location.replace(cleanURL);
}
