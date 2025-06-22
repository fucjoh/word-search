const assert = require('assert');
const {
    preprocessDictionary,
    isOneEditApart,
    findChain
} = require('./wordchain');
const { loadDictionary, getDictionary, formatChainHTML } = require('./main');

async function run() {
    const words = ['cat', 'cot', 'cog', 'dog'];
    const { dictionaryByLength } = preprocessDictionary(words);

    assert.strictEqual(isOneEditApart('cat', 'cot'), true);
    assert.strictEqual(isOneEditApart('cat', 'dog'), false);

    const chain = findChain('cat', 'dog', dictionaryByLength);
    assert.deepStrictEqual(chain, ['cat', 'cot', 'cog', 'dog']);

    const chain2 = findChain('cat', 'bat', dictionaryByLength);
    assert.strictEqual(chain2, null);

    // additional tests for length restrictions
    const words2 = ['a', 'ab', 'ba'];
    const { dictionaryByLength: dict2 } = preprocessDictionary(words2);
    const chain3 = findChain('a', 'ba', dict2);
    assert.deepStrictEqual(chain3, ['a', 'ba']);

    const words3 = ['ab', 'a', 'b'];
    const { dictionaryByLength: dict3 } = preprocessDictionary(words3);
    const chain4 = findChain('ab', 'b', dict3);
    assert.deepStrictEqual(chain4, ['ab', 'b']);

    const words4 = ['ab', 'a', 'ca', 'cd'];
    const { dictionaryByLength: dict4 } = preprocessDictionary(words4);
    const chain5 = findChain('ab', 'cd', dict4);
    assert.strictEqual(chain5, null);

    // test HTML formatting
    const html = formatChainHTML(['a', 'b']);
    assert.strictEqual(html, '<ol class="chain"><li>a</li><li>b</li></ol>');

    // ensure dictionary words are normalized to lowercase
    const mixedWords = ['Cat', 'cot', 'cog', 'Dog'];
    const { dictionaryByLength: mixedDict } = preprocessDictionary(mixedWords);
    const chain6 = findChain('cat', 'dog', mixedDict);
    assert.deepStrictEqual(chain6, ['cat', 'cot', 'cog', 'dog']);

    await loadDictionary('german.dic');
    assert.ok(getDictionary().length > 0);

    const htmlContent = require('fs').readFileSync('index.html', 'utf-8');
    assert.ok(htmlContent.includes('rel="icon"'), 'favicon link missing');

    console.log('All tests passed.');
}

run();
