const express = require('express');
const Blockchain = require('./Blockchain');
const PubSub = require('./app/pubsub');
const request = require('request');
const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `hhtp://localhost:${DEFAULT_PORT}`;

setTimeout(() => pubsub.broadcastChain(), 1000);
app.use(express.json());

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  pubsub.broadcastChain();

  res.redirect('/api/blocks');

  console.log('some new test on github code editor')
});

function syncChains() {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const rootChain = JSON.parse(body);
      blockchain.replaceChain(rootChain);

      console.log('replace chain on a sync with', rootChain);
    }
  });
}

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);

  if (PORT !== DEFAULT_PORT) {
    syncChains();
  }
});
