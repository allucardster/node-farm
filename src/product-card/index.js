const render = require('../render');

module.exports = (props) => {
  const { product = null } = props;

  if (null === product) {
    return '';
  }

  return render.template(`${__dirname}/product-card.html`, product);
};
