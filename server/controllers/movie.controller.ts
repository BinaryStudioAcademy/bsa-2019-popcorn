import { Router, NextFunction, Request, Response } from "express";
import * as movieService from "../services/movie.service";
import { getByTitle } from "../repository/movieElastic.repository";
import { Movie } from "../models/MovieModel";

const router = Router();

router

  .get("/", (req: Request, res: Response, next: NextFunction) =>
    movieService
      .getMovies()
      .then((movies: Movie[]) => res.send(movies))
      .catch(next)
  )
  .get("/find", (req, res, next) =>
    movieService
      .getByTitle(req.query.title)
      .then(movies => res.send(movies))
      .catch(e => {
        console.log(e.message);
        res.send({ message: e.message });
      })
      .catch(next)
  )
  .get("/elastic", (req: Request, res: Response, next: NextFunction) =>
    getByTitle(req.query.title)
      .then((response: Movie[]) => res.send(response))
      .catch(next)
  )
  // .get("/:id", (req: Request, res: Response, next: NextFunction) =>
  //   movieService
  //     .getMovieById(req.params.id)
  //     .then((movie: Movie) => res.send(movie))
  //     .catch(next)
  // )
  .post("/", (req: Request, res: Response, next: NextFunction) =>
    movieService
      .createMovie(req.body)
      .then((response: Movie[]) => res.send(response))
      .catch(next)
  )
  // .delete("/:id", (req: Request, res: Response, next: NextFunction) =>
  //   movieService
  //     .deleteMovieById(req.params.id)
  //     .then((response: Movie) => res.send(response))
  //     .catch(next)
  // )
  .put("/", (req: Request, res: Response, next: NextFunction) =>
    movieService
      .updateMovie(req.body)
      .then((response: Movie[]) => res.send(response))
      .catch(next)
  )
  .post("/rate", (req: Request, res: Response, next: NextFunction) =>
    movieService
      .saveMovieRate(req.body)
      .then((response: any) => res.send(response))
      .catch(next)
  )
  .get(
    "/rate/user/:userId/:movieId",
    (req: Request, res: Response, next: NextFunction) => {
      return movieService
        .getMovieRate(req.params.userId, req.params.movieId) // get movie by userId and movieId
        .then((response: any) => res.send(response))
        .catch(next);
    }
  );

export default router;
