let dictionary = [];

// Laden des Wörterbuchs aus der Datei german.dic
fetch('german.dic')
    .then(response => response.text())
    .then(text => {
        dictionary = text.split(/\r?\n/).filter(Boolean);
        console.log('Wörterbuch geladen, Anzahl Wörter:', dictionary.length);
    })
    .catch(err => console.error('Fehler beim Laden des Wörterbuchs:', err));

document.getElementById('searchButton').addEventListener('click', function() {
    const value1 = document.getElementById('field1').value;
    const value2 = document.getElementById('field2').value;

    const found1 = dictionary.includes(value1);
    const found2 = dictionary.includes(value2);

    console.log('Suche nach:', value1, value2);
    console.log('Gefunden?', found1, found2);
});
