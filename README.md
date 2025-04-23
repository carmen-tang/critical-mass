# Critical Mass

A lightweight vanilla JS project that:
- Fetches cities from `navigation.json` and renders navigation tabs
- Highlights the active tab with an animated indicator
- Displays the current date and local time (12‑hour format) for the selected city

## Files

```
index.html      HTML structure
styles.css      Styling for nav and displays
app.js          Fetch, render, indicator, and clock logic
navigation.json City data (section keys + labels)
```

## Quick Start

1. Serve over HTTP (e.g., `npx live-server . --port=8000`).
2. Open `http://localhost:8000` in your browser.

## `navigation.json`

```json
{ "cities": [ { "section": "cupertino", "label": "Cupertino" }, ... ] }
```

## Customize

- **Time zones**: In `app.js`, edit `tzMap`:
  ```js
  { cupertino: 'America/Los_Angeles', ... }
  ```
- **Styles**: Tweak CSS classes in `styles.css`.


## Future Improvements

- Additional design considerations
- Move to JS based framework if more complicated state is necessary
- Responsive navigation for different screen sizes
- Add keyboard navigation (arrow keys) and ARIA roles for tabs to improve screen reader support
- Error handling in UI
- Unit testing
- Bundler
- Optimization: Debounce resize events and minimize layout thrashing when positioning the indicator
- Extend navigation.json to include other info (like weather) and render it alongside the clock
