document.addEventListener('DOMContentLoaded', function() {
    const verses = [
        {"text": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.", "reference": "John 3:16"},
        {"text": "I can do all things through him who strengthens me.", "reference": "Philippians 4:13"},
        {"text": "Your word is a lamp to my feet and a light to my path.", "reference": "Psalm 119:105"}
        // Add more verses as needed
    ];

    function getRandomVerse() {
        const randomIndex = Math.floor(Math.random() * verses.length);
        return verses[randomIndex];
    }

    const verse = getRandomVerse();
    document.getElementById('verseDisplay').innerText = `${verse.text} — ${verse.reference}`;
});

