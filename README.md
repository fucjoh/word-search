# Word Search

This repository contains a minimal example project for looking up words in a German dictionary. It includes a small webpage that loads a dictionary file and checks if two input values exist in that list.

## Project Structure

- `index.html` – Main HTML page with two input fields and a search button.
- `main.js` – JavaScript that loads `german.dic` and performs a lookup when the button is pressed.
- `styles.css` – Basic styling for the page.
- `german.dic` – Dictionary file containing German words, one per line.
- `hello.txt` – Simple text file used as an example.

## Usage

1. Open `index.html` in a modern browser. The page will load `german.dic` and allow you to check whether the given words exist in the dictionary.
2. Alternatively, you can start a simple web server and navigate to `index.html`:
   ```bash
   python3 -m http.server
   ```
   This serves the project locally at `http://localhost:8000`.

The project does not rely on any build step or additional dependencies, so it can be used as-is.
