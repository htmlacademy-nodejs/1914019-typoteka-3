'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articlesPages/articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`articlesPages/post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articlesPages/post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articlesPages/post-detail`));

module.exports = articlesRouter;
