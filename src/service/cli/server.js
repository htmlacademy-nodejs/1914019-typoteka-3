'use strict';

const express = require(`express`);
const path = require(`path`);
const chalk = require(`chalk`);
const fs = require(`fs/promises`);

const {DEFAULT_PORT, MOCKS_FILE_NAME} = require(`../../constants`);

module.exports = {
  name: `--server`,
  run: async (port) => {
    port = Number.parseInt(port, 10) || DEFAULT_PORT;
    const app = express();
    const router = new express.Router();

    app.use(express.json());

    router.get(`/posts`, async (req, res) => {
      try {
        let content = await fs.readFile(path.resolve(MOCKS_FILE_NAME), `utf8`);
        content = content.split(`\n`).map((string) => string.trim()).filter((string) => string !== ``);
        res.json(content);
      } catch (err) {
        res.json([]);
        console.error(chalk.red(err));
      }
    });

    app.use(router);

    app.listen(DEFAULT_PORT);
    console.info(chalk.blue(port));
  },
};
