const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

const findAll = () => {
  return data;
}

const findById = (id) => {
  if (null === id) {
    return null;
  }

  return data[id] || null;
}

module.exports = {
  findAll,
  findById
}