# Word Search

This small browser-based tool searches for a chain of German words. A chain consists of words where each successive word differs from the previous one by exactly one added, removed or changed letter. The dictionary is loaded from `german.dic` on page load and the search button stays disabled until the load finished.

A simple favicon with a "W" helps identify the page in the browser tab.

Open `index.html` in a browser, enter two words and press **Suchen**. If a chain exists it will be printed as a small ordered list, otherwise an error message will be shown.

## Tests

A small test script validates the core search algorithm. Run it with:

```bash
node test.js
```

## Project Structure

- `index.html` – Main HTML page with two input fields and a search button.
- `main.js` – JavaScript that loads `german.dic`, enables the search button once loading finished and performs a lookup when the button is pressed.
- `styles.css` – Basic styling for the page.
- `favicon.svg` – Simple favicon for the browser tab.
- `german.dic` – Dictionary file containing German words, one per line.
- `hello.txt` – Simple text file used as an example.

## Usage

1. Open `index.html` in a modern browser. The page loads `german.dic` automatically; the search button becomes clickable once the dictionary is ready.
2. Alternatively, you can start a simple web server and navigate to `index.html`:
   ```bash
   python3 -m http.server
   ```
   This serves the project locally at `http://localhost:8000`.

The project does not rely on any build step or additional dependencies, so it can be used as-is.

