const INITIAL_DIFFICULTY = 3;
const MINE_RATE = 1000;
const STARTING_BALANCE = 1000;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: 'last-hash-xx0',
  hash: 'hash-one-xx0',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE };
