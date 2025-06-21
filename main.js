let dictionary = [];
let dictionarySet = new Set();
let dictionaryByLength = {};

// Laden des Wörterbuchs aus der Datei german.dic
fetch('german.dic')
    .then(response => response.text())
    .then(text => {
        dictionary = text.split(/\r?\n/).filter(Boolean);
        const processed = preprocessDictionary(dictionary);
        dictionarySet = processed.dictionarySet;
        dictionaryByLength = processed.dictionaryByLength;
        console.log('Wörterbuch geladen, Anzahl Wörter:', dictionary.length);
    })
    .catch(err => console.error('Fehler beim Laden des Wörterbuchs:', err));

const output = document.getElementById('output');

document.getElementById('searchButton').addEventListener('click', function() {
    const value1 = document.getElementById('field1').value.trim();
    const value2 = document.getElementById('field2').value.trim();

    if (!dictionarySet.has(value1) || !dictionarySet.has(value2)) {
        output.textContent = "Eines der Wörter wurde nicht im Wörterbuch gefunden.";
        return;
    }

    output.textContent = "Suche läuft...";
    setTimeout(() => {
        const chain = findChain(value1, value2, dictionaryByLength);
        if (chain) {
            output.textContent = chain.join(' -> ');
        } else {
            output.textContent = 'Keine Wortkette gefunden.';
        }
    }, 50);
});
