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
    sessionStorage.setItem('authenticated', isAuthenticated);
    redirectCleanURL();
}

function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if (isAuthenticated) {
        fetchVerses();
    } else {
        displayAuthenticationMessage();
    }
}

function fetchVerses() {
    fetch('verses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming your JSON file contains an array of verse objects
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            displayVerse(verse);
        })
        .catch(error => {
            console.error('Error fetching verses:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

function displayVerse(verse) {
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}

function redirectCleanURL() {
    window.location.href = window.location.origin + window.location.pathname;
}
