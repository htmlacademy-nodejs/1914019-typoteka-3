'use strict';

const {Router} = require(`express`);

const mainRoutes = require(`./main-routes`);
const articlesRoutes = require(`./articles-routes`);
const myRoutes = require(`./my-routes`);

const router = new Router();

router.use(`/`, mainRoutes);
router.use(`/offers`, articlesRoutes);
router.use(`/my`, myRoutes);
router.use((req, res) => {
  res.status(404);
  res.render(`errors/404`);
});

module.exports = router;
