# Word Search

This small browser-based tool searches for a chain of German words. A chain consists of words where each successive word differs from the previous one by exactly one added, removed or changed letter. The dictionary is loaded from `german.dic` on page load.

Open `index.html` in a browser, enter two words and press **Suchen**. If a chain exists it will be printed, otherwise an error message will be shown.

## Tests

A small test script validates the core search algorithm. Run it with:

```bash
node test.js
```
