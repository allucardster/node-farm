const api = require('./api');
const render = require('./render');
const overviewComponent = require('./overview');
const productComponent = require('./product');

const renderComponent = (component, props, res) => {
  try {
    const { title: indexTitle = null } = props;
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(
      render.template(`${__dirname}/index.html`, {
        indexTitle,
        indexBody: component(props),
      })
    );
  } catch (error) {
    console.error(error);
    res.writeHead(error.code || 500, { 'Content-type': 'text/html' });
    res.end(`<h1>${error.errorMessage || 'Oops! Something went wrong.'}</h1>`);
  }
};

const overviewController = (res) => {
  const products = api.findAll();
  const props = {
    products,
  };

  renderComponent(overviewComponent, props, res);
};

const productController = (slug, res) => {
  const product = api.findBySlug(slug);
  const props = {
    product,
    title: product ? `${product.productName} ${product.image}` : null,
  };

  renderComponent(productComponent, props, res);
};

module.exports = {
  overviewController,
  productController,
};
