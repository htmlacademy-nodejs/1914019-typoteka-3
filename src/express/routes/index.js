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
  res.status(404).render(`errors/404`);
});

router.use((err, _req, res, _next) => {
  res.status(500).render(`errors/500`, {error: err.message});
});

module.exports = router;
