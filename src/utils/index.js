'use strict';

module.exports = {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  shuffle(someArray) {
    for (let i = someArray.length - 1; i > 0; i--) {
      const randomPosition = Math.floor(Math.random() * i);
      [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
    }

    return someArray;
  },
  formatNumberToDateFormat(number) {
    return number < 10 ? `0${number}` : `${number}`;
  },
  getRandomDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDay();
    const hours = now.getHours();

    let randomMonth;
    let randomYear;
    let randomDay;
    let randomHours;
    let randomMinutes;
    let randomSeconds;

    switch (month) {
      case 1: {
        randomMonth = Number(module.exports.shuffle([1, 12, 11].slice(0, 1)));
        break;
      }
      case 2: {
        randomMonth = Number(module.exports.shuffle([2, 1, 12].slice(0, 1)));
        break;
      }
      default: {
        randomMonth = module.exports.getRandomInt(month - 2, month);
      }
    }

    if (randomMonth >= 11 && month <= 2) {
      randomYear = year - 1;
    } else {
      randomYear = year;
    }

    if (randomMonth === month) {
      randomDay = module.exports.getRandomInt(1, day);
    } else {
      randomDay = module.exports.getRandomInt(1, new Date(randomYear, randomMonth, 0).getDate());
    }

    if (randomDay === day && randomMonth === month) {
      randomHours = module.exports.getRandomInt(0, hours);
    } else {
      randomHours = module.exports.getRandomInt(0, 24);
    }

    randomMinutes = module.exports.getRandomInt(0, 60);
    randomSeconds = module.exports.getRandomInt(0, 60);

    return `${randomYear}-${module.exports.formatNumberToDateFormat(randomMonth)}-${module.exports.formatNumberToDateFormat(randomDay)} ${module.exports.formatNumberToDateFormat(randomHours)}:${module.exports.formatNumberToDateFormat(randomMinutes)}:${module.exports.formatNumberToDateFormat(randomSeconds)}`;
  },
};
