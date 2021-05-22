const http = require('http');
const url = require('url');
const app = require('./src');

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  switch (reqUrl.pathname) {
    case '/overview':
      res.writeHead(301, 'Redirecting to "/"', {'Location': '/'});
      res.end();
      break;
    case '/product':
      const id = reqUrl.searchParams.get('id');
      app.productController(id, res);
      break;
    case '/':
      app.overviewController(res);
      break;
    default:
      res.writeHead(404, {'Content-type': 'text/html'});
      res.end('<h1>Page Not Found</h1>');
      break;
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});