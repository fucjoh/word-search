/**
 * Preprocesses a list of words into lookup structures used by the search
 * algorithm.
 *
 * @param {string[]} words List of dictionary words.
 * @returns {{dictionarySet: Set<string>, dictionaryByLength: Record<number, string[]>}}
 */
function preprocessDictionary(words) {
  const normalized = words.map((w) => w.toLowerCase());
  const dictionarySet = new Set(normalized);
  const dictionaryByLength = {};
  for (const word of normalized) {
    const len = word.length;
    if (!dictionaryByLength[len]) dictionaryByLength[len] = [];
    dictionaryByLength[len].push(word);
  }
  return { dictionarySet, dictionaryByLength };
}

/**
 * Determines whether two words differ by exactly one edit operation.
 *
 * @param {string} a First word.
 * @param {string} b Second word.
 * @returns {boolean} True if the words are exactly one edit apart.
 */
function isOneEditApart(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;

  if (a.length === b.length) {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i] && ++diff > 1) return false;
    }
    return diff === 1;
  }

  if (a.length > b.length) [a, b] = [b, a];

  let i = 0,
    j = 0,
    diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else {
      if (++diff > 1) return false;
      j++;
    }
  }
  return true;
}

/**
 * Finds all dictionary words that are one edit away from the given word.
 *
 * @param {string} word              Source word.
 * @param {Record<number, string[]>} dictionaryByLength Dictionary indexed by word length.
 * @param {Set<string>} visited      Words already explored.
 * @returns {string[]} Neighboring words.
 */
function getNeighborsFromDictionary(word, dictionaryByLength, visited) {
  const result = [];
  const len = word.length;
  const lengths = [len];
  if (dictionaryByLength[len + 1]) lengths.push(len + 1);
  if (len > 1 && dictionaryByLength[len - 1]) lengths.push(len - 1);
  for (const l of lengths) {
    const words = dictionaryByLength[l] || [];
    for (const candidate of words) {
      if (visited.has(candidate) || candidate === word) continue;
      if (isOneEditApart(word, candidate)) result.push(candidate);
    }
  }
  return result;
}

/**
 * Performs a breadth-first search to find a chain from start to target.
 *
 * @param {string} start
 * @param {string} target
 * @param {Record<number, string[]>} dictByLength
 * @param {Set<string>} dictionarySet
 * @returns {string[] | null} Array containing the word chain, or null.
 */
function findChain(start, target, dictByLength, dictionarySet) {
  if (start === target) return [start];
  const startLen = start.length;
  const targetLen = target.length;
  const queue = [[start]];
  let index = 0;
  const visited = new Set([start]);

  while (index < queue.length) {
    const path = queue[index++];
    const word = path[path.length - 1];
    const neighbors = getNeighborsFromDictionary(word, dictByLength, visited);
    for (const n of neighbors) {
      if (visited.has(n)) continue;
      const nLen = n.length;

      if (startLen < targetLen) {
        if (nLen < word.length || nLen > targetLen) continue;
      } else if (startLen > targetLen) {
        if (nLen > word.length || nLen < targetLen) continue;
      } else if (nLen !== word.length) {
        continue;
      }

      const newPath = path.concat(n);
      if (n === target) return newPath;
      visited.add(n);
      queue.push(newPath);
    }
  }
  return null;
}

if (typeof module !== "undefined") {
  module.exports = {
    preprocessDictionary,
    isOneEditApart,
    getNeighborsFromDictionary,
    findChain,
  };
}
