const fs = require('fs');

const template = (path, data) => {
  try {
    const template = fs.readFileSync(path, 'utf-8');
    const names = Object.keys(data);
    const vals = Object.values(data);
    const closure = new Function(...names, `return \`${template}\`;`);

    return closure(...vals);
  } catch (error) {
    throwError(error)
  }
}

const throwError = (errorMessage, code) => {
  throw {
    errorMessage,
    code: code || 500
  }
}

module.exports = {
  template,
  throwError
}