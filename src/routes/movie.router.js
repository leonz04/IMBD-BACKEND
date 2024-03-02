const { getAll, create, getOne, remove, update,setActorsToMovie,setGenresToMovie,setDirectorsToMovie } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/movies/:id/genres')
    .post(setGenresToMovie)

movieRouter.route('/movies/:id/directors')
    .post(setDirectorsToMovie)

movieRouter.route('/movies/:id/actors')
    .post(setActorsToMovie)

module.exports = movieRouter;