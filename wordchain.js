function preprocessDictionary(words) {
    // Convert all dictionary entries to lowercase to allow case-insensitive
    // lookups.
    const normalized = words.map(w => w.toLowerCase());
    const dictionarySet = new Set(normalized);
    const dictionaryByLength = {};
    normalized.forEach(word => {
        const len = word.length;
        if (!dictionaryByLength[len]) {
            dictionaryByLength[len] = [];
        }
        dictionaryByLength[len].push(word);
    });
    return { dictionarySet, dictionaryByLength };
}

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

function getNeighbors(word, dictByLength, visited) {
    const res = [];
    const len = word.length;
    [len - 1, len, len + 1].forEach(l => {
        const list = dictByLength[l] || [];
        for (const cand of list) {
            if (!visited.has(cand) && isOneEditApart(word, cand)) {
                res.push(cand);
            }
        }
    });
    return res;
}

function findChain(start, target, dictByLength) {
    if (start === target) return [start];
    const startLen = start.length;
    const targetLen = target.length;
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const path = queue.shift();
        const word = path[path.length - 1];
        const neighbors = getNeighbors(word, dictByLength, visited);
        for (const n of neighbors) {
            if (visited.has(n)) continue;
            const nLen = n.length;

            if (startLen < targetLen) {
                if (nLen < word.length || nLen > targetLen) continue;
            } else if (startLen > targetLen) {
                if (nLen > word.length || nLen < targetLen) continue;
            } else {
                if (nLen !== word.length) continue;
            }

            const newPath = path.concat(n);
            if (n === target) return newPath;
            visited.add(n);
            queue.push(newPath);
        }
    }
    return null;
}

if (typeof module !== 'undefined') {
    module.exports = {
        preprocessDictionary,
        isOneEditApart,
        getNeighbors,
        findChain
    };
}
