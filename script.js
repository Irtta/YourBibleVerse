document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        authenticateToken(token);
    }
});

function authenticateToken(token) {
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g"; // Your NFC token
    if (token === expectedToken) {
        displayRandomVerse();
    } else {
        document.getElementById('verseDisplay').textContent = "Invalid NFC scan. Please try again.";
        document.getElementById('prompt').style.display = 'block'; // Show prompt if invalid
    }
}

function displayRandomVerse() {
    fetch('verses.json')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];
            document.getElementById('verseDisplay').innerHTML = `<strong>${verse.text}</strong> — ${verse.reference}`;
            document.getElementById('prompt').style.display = 'none'; // Hide the prompt when verse is displayed
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').textContent = "Error fetching verse data. Please try again later.";
        });
}
