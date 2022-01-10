'use strict';

const {
  getRandomInt,
  shuffle,
  getRandomDate,
} = require(`../../utils`);

const {ExitCode} = require(`../../constants`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;

const DEFAULT_COUNT = 1;
const MAX_MOCKS_COUNT = 1000;
const MAX_ANNOUNCE_COUNT = 5;
const FILE_NAME = `mocks.json`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_COUNT)).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }))
);

module.exports = {
  name: `--generate`,
  run: async (count) => {
    let countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_MOCKS_COUNT) {
      countOffer = MAX_MOCKS_COUNT;
    }

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      return console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      return process.exit(ExitCode.error);
    }
  },
};
