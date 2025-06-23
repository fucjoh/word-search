# Repo Guidance for Codex

This repository is intentionally minimal and does not use any build tools or automated tests.

- When changing files, there is no need to run a build step or package manager.
- Simply keep the HTML, CSS and JavaScript self-contained.
- If future instructions mention running tests, you can safely skip them because no test suite is present.

You are free to edit or extend the web page directly in place.

When implementing a new feature, always add corresponding tests. Update
`test.js` or create new test files so each feature is covered.

README updates are mandatory whenever functionality changes to keep
documentation current.

All code changes should be accompanied by a test run using:

```bash
node test.js
```

The test script must pass before committing.

Always run Prettier on modified files to ensure consistent formatting before each commit. This can be done with:

```bash
npx prettier -w <file(s)>
```
