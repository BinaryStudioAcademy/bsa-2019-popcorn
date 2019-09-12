import { NextFunction, Request, Response, Router } from "express";
import * as movieService from "../services/movie.service";
import { Movie } from "../models/MovieModel";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import { getAdviceMeList } from "../services/adviceMe.service";
import * as postService from "../services/post.service";

const router = Router();

router

  .get("/", (req: Request, res: Response, next: NextFunction) =>
    movieService
      .getMovies(req.query)
      .then((movies: Movie[]) => res.send(movies))
      .catch(next)
  )
  .post("/advanced", (req: Request, res: Response, next: NextFunction) => {
    movieService
      .getFiltredMovies(req.query, req.body)
      .then((movies: Movie[]) => res.send(movies))
      .catch(next);
  })
  .get("/find", (req, res, next) =>
    movieService
      .getByTitle(req.query.title)
      .then(movies => res.send(movies))
      .catch(e => {
        res.send({ message: e.message });
      })
      .catch(next)
  )
  .get("/:id", (req: any, res: Response, next: NextFunction) =>
    movieService
      .getMovieById(req.params.id)
      .then((movie: Movie) => res.send(movie))
      .catch(next)
  )
  .get("/:movieId/posts", (req: any, res: Response, next: NextFunction) => {
    return postService
      .getPosts(req.params.movieId)
      .then((response: any) => res.send(response))
      .catch(next);
  })
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
    (req: any, res: Response, next: NextFunction) => {
      return movieService
        .getMovieRate(req.params.userId, req.params.movieId)
        .then((response: any) => res.send(response))
        .catch(next);
    }
  )
  .get("/rate/user/all", errorHandlerMiddleware, (req, res, next) =>
    movieService
      .getAllUserRates(req.user.id)
      .then(response => res.send(response))
      .catch(next)
  )
  .delete("/rate/:id", (req: any, res: Response, next: NextFunction) =>
    movieService
      .deleteMovieRate(req.params.id)
      .then((response: any) => res.send(response))
      .catch(next)
  )
  .get(
    "/advanced/get-genres",
    (req: any, res: Response, next: NextFunction) => {
      return movieService
        .getMoviesGenres()
        .then((response: any) => res.send(response))
        .catch(next);
    }
  )
  .get("/elastic/search", errorHandlerMiddleware, (req, res, next) =>
    movieService
      .searchMovieTitles(req.query.title, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/elastic/properties/id", errorHandlerMiddleware, (req, res, next) =>
    movieService
      .getMovieProperties(req.query.settings, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/awards/:imdbId", (req: any, res: Response, next: NextFunction) => {
    return movieService
      .getMovieAwards(req.params.imdbId) // get movie by userId and movieId
      .then((response: any) => res.send(response))
      .catch(next);
  })
  .get("/adviceMe/:userId", (req: any, res: Response, next: NextFunction) => {
    getAdviceMeList(req.params.userId, next)
      .then(movies => res.send(movies))
      .catch(next);
  });

export default router;
