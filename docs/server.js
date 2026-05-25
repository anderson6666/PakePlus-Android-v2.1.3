const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveFile(filePath, res, urlPath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', filePath);
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url).split('?')[0];

  if (urlPath === '/favicon.ico') {
    fs.stat('./favicon.svg', (err, stats) => {
      if (!err && stats.isFile()) {
        serveFile('./favicon.svg', res, urlPath);
      } else {
        res.writeHead(204);
        res.end();
      }
    });
    return;
  }

  if (urlPath.startsWith('/@')) {
    serveFile('./index.html', res, urlPath);
    return;
  }

  let filePath = '.' + urlPath;

  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const ext = path.extname(urlPath);
      if (mimeTypes[ext]) {
        const fileName = path.basename(urlPath);
        
        const rootPath = './' + fileName;
        fs.stat(rootPath, (err2, stats2) => {
          if (!err2 && stats2.isFile()) {
            serveFile(rootPath, res, urlPath);
          } else {
            const assetsPath = './assets/' + fileName;
            fs.stat(assetsPath, (err3, stats3) => {
              if (!err3 && stats3.isFile()) {
                serveFile(assetsPath, res, urlPath);
              } else {
                res.writeHead(404);
                res.end('Not found');
              }
            });
          }
        });
      } else {
        serveFile('./index.html', res, urlPath);
      }
    } else {
      serveFile(filePath, res, urlPath);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});