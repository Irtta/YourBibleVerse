// Function to handle NFC card authentication and fetch verse data
function authenticateAndFetchVerses() {
    // Extract token from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const token = params.token;

    // Compare token with expected shared token
    const expectedToken = "sY6gXmTb8qYnJxMw8qAs5lFvJmO6tGpP9ySfZhHtUw0qW$zEcNw9yR!g"; // Replace with your actual shared token
    if (token === expectedToken) {
        // Authentication successful, store token in sessionStorage and fetch verse data
        sessionStorage.setItem('authToken', token); // Store token in sessionStorage
        fetchVerses();
    } else {
        // Authentication failed, display error message
        document.getElementById('verseDisplay').innerHTML = "Authentication failed. Please tap your NFC card again.";
    }
}

// Function to fetch verse data from JSON file
function fetchVerses() {
    fetch('verses.json') // Replace 'verses.json' with the path to your JSON file
        .then(response => response.json())
        .then(data => displayRandomVerse(data))
        .catch(error => console.error('Error fetching verse data:', error));
}

// Function to display random verse
function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}

// Call the authentication and verse fetch function when the page loads
authenticateAndFetchVerses();

// Event listener for page refresh
window.addEventListener('beforeunload', () => {
    // Remove authentication token from sessionStorage
    sessionStorage.removeItem('authToken');
    console.log('beforeunload event listener triggered'); // Add this line for debugging
});


