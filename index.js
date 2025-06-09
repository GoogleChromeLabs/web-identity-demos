const path = require('path');

const express = require('express');
const app = express();

const pageList = [];

// Traverse subdirectories and create an array of subdirectory names named
// `pageList`
const fs = require('fs');
const directories = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const dir of directories) {
  // Check if the directory contains an index.html file
  const indexPath = path.join(__dirname, dir, 'package.json');
  if (fs.existsSync(indexPath)) {
    pageList.push(dir);
    // Serve static files from each subdirectory
    app.use(`/${dir}`, express.static(path.join(__dirname, dir, 'public')));
  }
}

app.use(express.static(path.join(__dirname, 'favicon.ico')));

// Serve the root directory
app.get('/', (req, res) => {
  // Traverse the list of subdirectory names and create an HTML list item with a
  // link to the subdirectories. Finally, encapsulate them with `ol` tag to
  // make it a valid HTML page.
  const pageLinks = pageList.map(page => `<li><a href="${page}">${page}</a></li>`).join('');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Web Identity Demos</title>
    </head>
    <body>
      <h1>Web Identity Demos</h1>
      <p>Serve this local only.</p>
      <p>Select a demo from the list below:</p>
      <ol>
        ${pageLinks}
      </ol>
    </body>
    </html>
  `);// construct an HTML list and render it.
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
