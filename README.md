# Your Guide to the Faculty of Business

Static site — HTML + CSS + vanilla JS (+ Lucide icons, IBM Plex Sans Arabic via CDN). Open `index.html` or deploy to GitHub Pages.

```
index.html              Home
pages/                  halls · map · about · team
assets/css/             tokens · base · surface · layout · components · pages
assets/js/core/         app.js (i18n runtime) · shell.js (header / bottom nav / footer)
assets/js/services/     search-engine.js  ← the non-UI logic (fuzzy Arabic/English search)
assets/js/pages/        one script per page
assets/images/          campus-map.png · faculty-logo.png
data/                   translations · buildings (map coordinates) · spaces (from Excel) · departments · team
data/source/            original Excel file
```
Edit content in `data/` (department info, careers and the MIS study plan live in `data/departments.js`; all UI text is in `data/translations.js`). Map pins use pixel coordinates (x, y) on the 1280×720 map image.
