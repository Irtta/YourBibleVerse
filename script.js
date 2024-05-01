// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there is a token in localStorage or URL parameters
    let token = new URLSearchParams(window.location.search).get('token') || localStorage.getItem('authToken');

    // If a token is present
    if (token) {
        authenticateToken(token);
    } else {
        // If no token is found, display authentication failure message
        displayAuthenticationMessage();
    }
});

// Function to authenticate the token
function authenticateToken(token) {
    // Expected authentication token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    
    // If the provided token matches the expected token
    if (token === expectedToken) {
        // Store the token in localStorage for persistent authentication
        localStorage.setItem('authToken', token);
        // Display a random Bible verse
        displayRandomVerse();
    } else {
        // If authentication fails, clear the potentially invalid token and display a failure message
        localStorage.removeItem('authToken');
        displayAuthenticationMessage();
    }
}

// Function to display authentication failure message
function displayAuthenticationMessage() {
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}

// Function to display a random Bible verse
function displayRandomVerse() {
    // Fetch the Bible verse from a static JSON file
    fetch('verses.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Select a random verse from the data
            const randomIndex = Math.floor(Math.random() * data.length);
            const verse = data[randomIndex];

            // Display the selected verse
            document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}
