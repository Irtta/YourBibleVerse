document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
    } else {
        // Check if previously authenticated in this session
        if (sessionStorage.getItem('authenticated') === 'true') {
            fetchVerses();
        } else {
            displayAuthenticationMessage();
        }
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        sessionStorage.setItem('authenticated', 'true');
        // Redirect to remove the token from the URL
        window.location.href = 'https://irtta.github.io/YourBibleVerse/';
    } else {
        sessionStorage.setItem('authenticated', 'false');
        // Redirect to clean URL even if authentication fails to remove the token
        window.location.href = 'https://irtta.github.io/YourBibleVerse/';
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

function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}
