const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
faker.locale = 'ru';

class Data {
  constructor() {
    this.posts = null;
  }

  getPost() {
    return {
      id: uuidv4(),
      title: faker.hacker.phrase(),
      image: faker.image.image(),
      created: this.getDate(),
    }
  }

  static int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getDate() {
    const formatter = new Intl.DateTimeFormat("ru", {
      timeZone: "Europe/Moscow",
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return this.cleanDate(formatter.format(new Date()));
  }

  cleanDate(str) {
    const temp1 = str.split(' ');
    const date = [temp1[0].slice(0, -1), temp1[1]].join(' ');
    return date;
  }

  postGenerator() {
    this.posts = [];
    for (let i = 0; i < Data.int(2, 5); i += 1) {
      this.posts.push(this.getPost());
    }
    return this.posts;
  }
}

const data = new Data();

module.exports = data;