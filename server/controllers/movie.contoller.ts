import * as movieService from '../services/movie.service';
import { Router } from 'express';

const router = Router();

router
	.get('/find', (req, res, next) => movieService.getByTitle(req.query.title)
	.then(movies =>
		res.send(movies)
	)
	.catch(e => {
		console.log(e.message);
		res.send({message: e.message});
	})
	.catch(next))

export default router;