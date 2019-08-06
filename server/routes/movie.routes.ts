import { Router, NextFunction, Request, Response } from 'express';
//import * as movieService from '../services/movie.service';

import { Movie } from '../models/MovieModel';

const router = Router();

router
    .get('/', (req: Request, res: Response, next: NextFunction) => movieService.getMovies(req.query)
        .then((movies: Movie[]) => res.send(movies))
        .catch(next))
    .get('/:id', (req: Request, res: Response, next: NextFunction) => movieService.getMovieById(req.params.id)
        .then((movie: Movie) => res.send(movie))
        .catch(next))
    .post('/', (req: Request, res: Response, next: NextFunction) => movieService.createMovie(req.body)
        .then((response: string) => res.send(response))
        .catch(next))
    .delete('/:id', (req: Request, res: Response, next: NextFunction) => movieService.deleteMovieById(req.params.id)
        .then((response: string) => res.send(response))
        .catch(next))
    .put('/', (req: Request, res: Response, next: NextFunction) => movieService.updateMovie(req.body)
        .then((response: string) => res.send(response))
        .catch(next))

export default router;