document.addEventListener('DOMContentLoaded', function() {
    fetch('https://bible-api.com/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('verseDisplay').innerHTML = `${data.text} - ${data.reference}`;
        })
        .catch(error => console.error('Error fetching the verse:', error));
});
