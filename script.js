document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
    } else {
        // No token means we're possibly after redirect or no token was provided
        setupPage();  // Function to setup page based on session state
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        sessionStorage.setItem('authenticated', 'true');
    } else {
        sessionStorage.setItem('authenticated', 'false');
    }
    // Redirect to clean URL to remove the token from the URL
    window.location.href = 'https://irtta.github.io/YourBibleVerse/';
}

function setupPage() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        fetchVerses();
    } else {
        document.getElementById('verseDisplay').innerHTML = "Please authenticate to view a verse.";
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

