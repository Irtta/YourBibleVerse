document.addEventListener('DOMContentLoaded', function() {
    const token = (new URLSearchParams(window.location.search)).get('token');
    if (token) {
        authenticateToken(token);
    } else {
        checkAuthentication();
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    const isAuthenticated = token === expectedToken;
    if (isAuthenticated) {
        sessionStorage.setItem('authenticated', 'true');
        redirectCleanURL();
    } else {
        displayAuthenticationMessage();
    }
}

function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
        displayAuthenticationMessage();
    } else {
        // User is authenticated, you can add code here to display content
    }
}

function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}

function redirectCleanURL() {
    // Remove token from URL and redirect to clean URL
    history.replaceState({}, document.title, window.location.pathname);
}
