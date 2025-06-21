let dictionary = [];
let dictionarySet = new Set();
let dictionaryByLength = {};

// Laden des Wörterbuchs aus der Datei german.dic
fetch('german.dic')
    .then(response => response.text())
    .then(text => {
        dictionary = text.split(/\r?\n/).filter(Boolean);
        dictionarySet = new Set(dictionary);
        dictionaryByLength = {};
        dictionary.forEach(word => {
            const len = word.length;
            if (!dictionaryByLength[len]) {
                dictionaryByLength[len] = [];
            }
            dictionaryByLength[len].push(word);
        });
        console.log('Wörterbuch geladen, Anzahl Wörter:', dictionary.length);
    })
    .catch(err => console.error('Fehler beim Laden des Wörterbuchs:', err));

const output = document.getElementById('output');

function isOneEditApart(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    if (a.length === b.length) {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                diff++;
                if (diff > 1) return false;
            }
        }
        return diff === 1;
    }

    // ensure a is the shorter
    if (a.length > b.length) [a, b] = [b, a];
    let i = 0, j = 0, diff = 0;
    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            i++; j++;
        } else {
            diff++; j++;
            if (diff > 1) return false;
        }
    }
    return true;
}

function getNeighbors(word, visited) {
    const res = [];
    const len = word.length;
    [len - 1, len, len + 1].forEach(l => {
        const list = dictionaryByLength[l] || [];
        for (const cand of list) {
            if (!visited.has(cand) && isOneEditApart(word, cand)) {
                res.push(cand);
            }
        }
    });
    return res;
}

function findChain(start, target) {
    if (start === target) return [start];
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const path = queue.shift();
        const word = path[path.length - 1];
        const neighbors = getNeighbors(word, visited);
        for (const n of neighbors) {
            if (visited.has(n)) continue;
            const newPath = path.concat(n);
            if (n === target) return newPath;
            visited.add(n);
            queue.push(newPath);
        }
    }
    return null;
}

function performSearch() {
    const value1 = document.getElementById('field1').value.trim();
    const value2 = document.getElementById('field2').value.trim();

    if (!dictionarySet.has(value1) || !dictionarySet.has(value2)) {
        output.textContent = "Eines der Wörter wurde nicht im Wörterbuch gefunden.";
        return;
    }

    output.textContent = "Suche läuft...";
    setTimeout(() => {
        const chain = findChain(value1, value2);
        if (chain) {
            output.textContent = chain.join(' -> ');
        } else {
            output.textContent = 'Keine Wortkette gefunden.';
        }
    }, 50);
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    performSearch();
});
