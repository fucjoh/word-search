const assert = require('assert');
const {
    preprocessDictionary,
    isOneEditApart,
    getNeighborsFromDictionary,
    findChain
} = require('./wordchain');
const { loadDictionary, getDictionary, formatChainHTML } = require('./main');

async function run() {
    const words = ['cat', 'cot', 'cog', 'dog'];
    const { dictionaryByLength, dictionarySet } = preprocessDictionary(words);

    assert.strictEqual(isOneEditApart('cat', 'cot'), true);
    assert.strictEqual(isOneEditApart('cat', 'dog'), false);

    const neighbors = getNeighborsFromDictionary('cat', dictionaryByLength, new Set(['cat']));
    assert.deepStrictEqual(neighbors.sort(), ['cot']);

    const chain = findChain('cat', 'dog', dictionaryByLength, dictionarySet);
    assert.deepStrictEqual(chain, ['cat', 'cot', 'cog', 'dog']);

    const chain2 = findChain('cat', 'bat', dictionaryByLength, dictionarySet);
    assert.strictEqual(chain2, null);

    // additional tests for length restrictions
    const words2 = ['a', 'ab', 'ba'];
    const { dictionaryByLength: dict2, dictionarySet: set2 } = preprocessDictionary(words2);
    const chain3 = findChain('a', 'ba', dict2, set2);
    assert.deepStrictEqual(chain3, ['a', 'ba']);

    const words3 = ['ab', 'a', 'b'];
    const { dictionaryByLength: dict3, dictionarySet: set3 } = preprocessDictionary(words3);
    const chain4 = findChain('ab', 'b', dict3, set3);
    assert.deepStrictEqual(chain4, ['ab', 'b']);

    const words4 = ['ab', 'a', 'ca', 'cd'];
    const { dictionaryByLength: dict4, dictionarySet: set4 } = preprocessDictionary(words4);
    const chain5 = findChain('ab', 'cd', dict4, set4);
    assert.strictEqual(chain5, null);

    // test HTML formatting
    const html = formatChainHTML(['a', 'b']);
    assert.strictEqual(html, '<ol class="chain"><li>a</li><li><span class="diff">b</span></li></ol>');

    // ensure dictionary words are normalized to lowercase
    const mixedWords = ['Cat', 'cot', 'cog', 'Dog'];
    const { dictionaryByLength: mixedDict, dictionarySet: mixedSet } = preprocessDictionary(mixedWords);
    const chain6 = findChain('cat', 'dog', mixedDict, mixedSet);
    assert.deepStrictEqual(chain6, ['cat', 'cot', 'cog', 'dog']);

    await loadDictionary('german.dic');
    assert.ok(getDictionary().length > 0);

    const htmlContent = require('fs').readFileSync('index.html', 'utf-8');
    assert.ok(htmlContent.includes('rel="icon"'), 'favicon link missing');

    console.log('All tests passed.');
}

run();
