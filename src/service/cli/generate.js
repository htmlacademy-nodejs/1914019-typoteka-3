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
    return content.trim().split(`\n`).filter((string) => string !== ``);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, {titles, sentences, categories}) => (
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

    const [titles, sentences, categories] = await Promise.all([readContent(FILE_TITLES_PATH), readContent(FILE_SENTENCES_PATH), readContent(FILE_CATEGORIES_PATH)]);

    const options = {
      titles,
      sentences,
      categories
    };

    const content = JSON.stringify(generateOffers(countOffer, options));

    try {
      await fs.writeFile(FILE_NAME, content);
      return console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      return process.exit(ExitCode.error);
    }
  },
};
