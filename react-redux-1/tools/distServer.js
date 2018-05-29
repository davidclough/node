import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

// Similar to srcServer, mainly without the webpack stuff.

const port = 3294;
const app = express();

// GZIPs from 411K to 126K. Can reduce even further by excluding babel-polyfill, toastr, jquery, bootstrap (he included for speed of development).
app.use(compression());

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
