document.addEventListener('DOMContentLoaded', function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    if (token) {
        authenticateToken(token);
    } else if (sessionStorage.getItem('authenticated') === 'true') {
        // Only fetch verses if authenticated in the same session
        fetchVerses();
    } else {
        displayAuthenticationMessage();
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        sessionStorage.setItem('authenticated', 'true');
        // Redirect to the same page but without query parameters
        window.location.href = window.location.pathname;
    } else {
        sessionStorage.setItem('authenticated', 'false');
        displayAuthenticationMessage();
    }
}

function fetchVerses() {
    console.log("Fetching verses...");
    fetch('verses.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => displayRandomVerse(data))
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed or no token found. Please tap your NFC card again.";
}

