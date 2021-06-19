const render = require('../render');

module.exports = (props) => {
  const {product = null} = props;

  if (null === product) {
    render.throwError('Product Not Found', 404);
  }

  return render.template(`${__dirname}/product.html`, product);
}