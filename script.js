document.addEventListener('DOMContentLoaded', function() {
    fetch('ves.json')
        .then(response => response.json())
        .then(verses => {
            displayRandomVerse(verses);
        })
        .catch(error => {
            console.error('Error loading the verses:', error);
            document.getElementById('verseDisplay').innerText = 'Failed to load verse';
        });
});

function displayRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    document.getElementById('verseDisplay').innerHTML = `${verse.text} — ${verse.reference}`;
}
