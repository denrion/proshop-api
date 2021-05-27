/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const newman = require('newman');

const env = dotenv.config();
dotenvExpand(env);

// call newman.run to pass `options` object and wait for callback
newman.run(
  {
    collection: process.env.POSTMAN_COLLECTION,
    environment: process.env.POSTMAN_ENVIRONMENT_LOCAL,
    reporters: 'cli',
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.info('collection run complete!');
  },
);
