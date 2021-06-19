const fs = require('fs');
const slugify = require('slugify');

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8')).map((item) => {
  item.slug = slugify(item.productName, {lower: true});
  return item;
});

const dataSlugs = data.reduce((obj, item) => {
  return {...obj, [item.slug] : item.id};
}, {});

const findAll = () => {
  return data;
}

const findById = (id) => {
  if (null === id) {
    return null;
  }

  return data[id] || null;
}

const findBySlug = (slug) => {
  if (null === slug || !(typeof slug === 'string' || slug instanceof String)) {
    return null;
  }

  if (slug in dataSlugs) {
    return findById(dataSlugs[slug]);
  }
}

module.exports = {
  findAll,
  findById,
  findBySlug
}