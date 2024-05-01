document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
        clearURL(); // Clear the token from the URL after use
    } else {
        document.getElementById('verseDisplay').textContent = "Please tap your NFC card to view a verse.";
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        displayRandomVerse();
    } else {
        document.getElementById('verseDisplay').textContent = "Authentication failed. Please try again.";
    }
}

function displayRandomVerse() {
    fetch('verses.json') // Make sure the path to your JSON file is correct
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').textContent = "Error fetching verse data. Please try again later.";
        });
}

function clearURL() {
    const url = new URL(window.location);
    url.searchParams.delete('token');
    window.history.replaceState({}, '', url);
}
