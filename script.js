// Function to execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there is a token in the URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    // If a token is present in the URL
    if (token) {
        // Attempt to authenticate the token
        authenticateToken(token);
    } else {
        // If no token is found in the URL, display authentication failure message
        displayAuthenticationMessage();
    }
});

// Function to authenticate the token
function authenticateToken(token) {
    // Expected authentication token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g";
    
    // If the provided token matches the expected token
    if (token === expectedToken) {
        // Display a random Bible verse
        displayRandomVerse();
    } else {
        // If authentication fails, display authentication failure message
        displayAuthenticationMessage();
    }
}

// Function to display authentication failure message
function displayAuthenticationMessage() {
    // Display a message indicating authentication failure
    document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
}

// Function to display a random Bible verse
function displayRandomVerse() {
    // Fetch the Bible verse from an API or static JSON file
    fetch('verses.json') // Replace 'verses.json' with the path to your JSON file
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

            // Clear authentication status from session storage after displaying the verse
            sessionStorage.removeItem('authenticated');
        })
        .catch(error => {
            console.error('Error fetching verse data:', error);
            // Display an error message if fetching the verse fails
            document.getElementById('verseDisplay').innerHTML = "Error fetching verse data. Please try again later.";
        });
}

