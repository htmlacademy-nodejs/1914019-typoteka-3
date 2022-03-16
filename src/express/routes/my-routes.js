'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`myPages/my`));
myRouter.get(`/comments`, (req, res) => res.render(`myPages/comments`));
myRouter.get(`/categories`, (req, res) => res.render(`myPages/all-categories`));

module.exports = myRouter;
