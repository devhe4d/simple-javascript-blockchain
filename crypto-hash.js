const crypto = require('crypto');
function cryptoHash(...args) {
  const hash = crypto.createHash('sha256');

  hash.update(args.sort().join(''));

  return hash.digest('hex');
}

module.exports = cryptoHash;
