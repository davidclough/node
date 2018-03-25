// DYNAMIC IMPORTS are not supported by ES1025 syntax.
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./store.prod');
} else {
  module.exports = require('./store.dev');
}
