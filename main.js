document.getElementById('searchButton').addEventListener('click', function() {
    const value1 = document.getElementById('field1').value.toLowerCase();
    const value2 = document.getElementById('field2').value.toLowerCase();

    const results = germanWords.filter(w => w.startsWith(value1) || w.startsWith(value2));
    console.log('Gefundene Wörter:', results);
});

console.log('Geladenes Wörterbuch enthält', germanWords.length, 'Wörter');
