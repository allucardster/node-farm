const render = require('../render');
const productCard = require('../product-card');

module.exports = (props) => {
  const { products = [] } = props;

  return render.template(`${__dirname}/overview.html`, {
    cards: products.map((product) => productCard({product}))
  });
}