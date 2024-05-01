// Check if we are reloading with a token
const urlSearchParams = new URLSearchParams(window.location.search);
const token = urlSearchParams.get('token');
const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";

if (token) {
    if (token === expectedToken) {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('authenticated', 'true');
        window.history.replaceState(null, null, window.location.pathname);  // Clean the URL
    } else {
        sessionStorage.setItem('authenticated', 'false');
        alert("Authentication failed. Please tap your NFC card again.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        fetchVerses();
    } else {
        document.getElementById('verseDisplay').innerHTML = "Please authenticate to view a verse.";
    }
});

function fetchVerses() {
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
