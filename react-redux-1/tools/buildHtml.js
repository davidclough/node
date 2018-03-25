import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console*/

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  // Fast implementation of core jQuery for servers.
  const $ = cheerio.load(markup);

  // Since a separate stylesheet is only utilised for prod build, we need to dynamically add the link tag.
  // He explained how we might see FOUC in dev because all the CSS is converted to JS within the bundle.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
});

// Could also reference a bug tracking library...
