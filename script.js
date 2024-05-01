// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there is a token in the URL parameters
    const token = (new URLSearchParams(window.location.search)).get('token');

    // Log token for debugging
    console.log("Token from URL:", token);

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
    
    // Log expected token for debugging
    console.log("Expected Token:", expectedToken);

    // If the provided token matches the expected token
    if (token === expectedToken) {
        // Log authentication success for debugging
        console.log("Authentication successful");

        // Store authentication status in session storage
        sessionStorage.setItem('authenticated', 'true');
    } else {
        // If authentication fails, display authentication failure message
        displayAuthenticationMessage();
    }
}

// Function to display authentication failure message
function displayAuthenticationMessage() {
    // Display a message indicating authentication failure
    console.log("Authentication failed. Please tap your NFC card again.");
}
