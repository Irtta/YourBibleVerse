document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
    } else {
        // Check if authenticated in session
        const authenticated = sessionStorage.getItem('authenticated');
        if (authenticated === 'true') {
            fetchVerses();
        } else {
            displayAuthenticationMessage();
        }
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        // Set authenticated state in session
        sessionStorage.setItem('authenticated', 'true');
        // Redirect to remove token from URL
        window.location.href = window.location.origin + window.location.pathname;
    } else {
        // Set unauthenticated state in session
        sessionStorage.setItem('authenticated', 'false');
        // Redirect to remove token from URL even if authentication fails
        window.location.href = window.location.origin + window.location.pathname;
    }
}

function fetchVerses() {
    fetch('verses.json')
        .then(response => response.json())
        .then(data => displayRandomVerse(data))
        .catch(error => {
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}
