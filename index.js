const http = require('http');
const app = require('./src');

const getUrl = (req) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const productSlug = (
    reqUrl.pathname.match(/(?<=\/product\/).*$/gm) || [null]
  ).pop();

  if (null !== productSlug) {
    reqUrl.pathname = '/product';
    reqUrl.searchParams.append('slug', productSlug);
  }

  return reqUrl;
};

const server = http.createServer((req, res) => {
  const reqUrl = getUrl(req);

  switch (reqUrl.pathname) {
    case '/overview':
      res.writeHead(301, 'Redirecting to "/"', { Location: '/' });
      res.end();
      break;
    case '/product':
      const slug = reqUrl.searchParams.get('slug');
      app.productController(slug, res);
      break;
    case '/':
      app.overviewController(res);
      break;
    default:
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>Page Not Found</h1>');
      break;
  }
});

const serverPort = process.env.PORT || 8000;

server.listen(serverPort, '127.0.0.1', () => {
  console.log(`Listening to requests on port ${serverPort}`);
});
