const assert = require('assert');
const {
    preprocessDictionary,
    isOneEditApart,
    findChain
} = require('./wordchain');

const words = ['cat', 'cot', 'cog', 'dog'];
const { dictionaryByLength } = preprocessDictionary(words);

assert.strictEqual(isOneEditApart('cat', 'cot'), true);
assert.strictEqual(isOneEditApart('cat', 'dog'), false);

const chain = findChain('cat', 'dog', dictionaryByLength);
assert.deepStrictEqual(chain, ['cat', 'cot', 'cog', 'dog']);

const chain2 = findChain('cat', 'bat', dictionaryByLength);
assert.strictEqual(chain2, null);

console.log('All tests passed.');
