let dictionary = [];
let dictionarySet = new Set();
let dictionaryByLength = {};
let dictionaryLoaded = false;

if (typeof module !== 'undefined') {
    var { preprocessDictionary, findChain } = require('./wordchain');
}

async function loadDictionary(path = 'german.dic') {
    let text;
    if (typeof window === 'undefined' || typeof fetch !== 'function') {
        const fs = require('fs').promises;
        text = await fs.readFile(path, 'utf-8');
    } else {
        const response = await fetch(path);
        text = await response.text();
    }
    dictionary = text.split(/\r?\n/)
        .filter(Boolean)
        .map(word => word.toLowerCase());
    const processed = preprocessDictionary(dictionary);
    dictionarySet = processed.dictionarySet;
    dictionaryByLength = processed.dictionaryByLength;
    dictionaryLoaded = true;
}
let output;

function highlightChange(prev, curr) {
    let i = 0, j = 0;
    while (i < prev.length && j < curr.length && prev[i] === curr[j]) {
        i++; j++;
    }
    if (j < curr.length) {
        return curr.slice(0, j) + '<span class="diff">' + curr[j] + '</span>' + curr.slice(j + 1);
    }
    return curr;
}

function formatChainHTML(chain) {
    const items = [];
    for (let i = 0; i < chain.length; i++) {
        const word = chain[i];
        if (i === 0) {
            items.push(`<li>${word}</li>`);
        } else {
            items.push(`<li>${highlightChange(chain[i - 1], word)}</li>`);
        }
    }
    return '<ol class="chain">' + items.join('') + '</ol>';
}

function performSearch() {
    const value1 = document.getElementById('field1').value.trim().toLowerCase();
    const value2 = document.getElementById('field2').value.trim().toLowerCase();

    if (!dictionarySet.has(value1) || !dictionarySet.has(value2)) {
        output.textContent = "Eines der Wörter wurde nicht im Wörterbuch gefunden.";
        return;
    }

    output.textContent = "Suche läuft...";
    setTimeout(() => {
        const chain = findChain(value1, value2, dictionaryByLength, dictionarySet);
        if (chain) {
            output.innerHTML = formatChainHTML(chain);
        } else {
            output.textContent = 'Keine Wortkette gefunden.';
        }
    }, 50);
}

if (typeof document !== 'undefined') {
    output = document.getElementById('output');
    const searchButton = document.getElementById('searchButton');
    searchButton.disabled = true;

    loadDictionary().then(() => {
        console.log('Wörterbuch geladen, Anzahl Wörter:', dictionary.length);
        searchButton.disabled = false;
    }).catch(err => {
        console.error('Fehler beim Laden des Wörterbuchs:', err);
        output.textContent = 'Fehler beim Laden des Wörterbuchs.';
    });

    document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();
        if (dictionaryLoaded) {
            performSearch();
        }
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        loadDictionary,
        getDictionary: () => dictionary,
        isDictionaryLoaded: () => dictionaryLoaded,
        formatChainHTML,
        highlightChange
    };
}
