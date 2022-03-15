'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`mainPages/main`));
mainRouter.get(`/register`, (req, res) => res.render(`mainPages/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`mainPages/login`));
mainRouter.get(`/search`, (req, res) => res.render(`mainPages/search`));

module.exports = mainRouter;
