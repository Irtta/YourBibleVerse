document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
        clearURL(); // Clear the URL immediately after processing the token
    } else {
        document.getElementById('prompt').style.display = 'block'; // Show the prompt if no token is present
        document.getElementById('verseDisplay').textContent = ""; // Clear verse display
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    if (token === expectedToken) {
        displayRandomVerse();
        document.getElementById('prompt').style.display = 'none'; // Hide the prompt when a valid verse is displayed
    } else {
        document.getElementById('verseDisplay').textContent = "Invalid card scan. Please try again.";
        document.getElementById('prompt').style.display = 'block'; // Ensure the prompt is visible
    }
}

function displayRandomVerse() {
    fetch('verses.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            document.getElementById('verseDisplay').textContent = `${verse.text} — ${verse.reference}`;
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').textContent = "Error fetching verse data. Please try again later.";
            document.getElementById('prompt').style.display = 'block'; // Show the prompt on error
        });
}

function clearURL() {
    window.history.replaceState({}, document.title, window.location.pathname);
}
