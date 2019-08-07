import { Router } from 'express';
import * as postService from '../services/post.service'

const router = Router();

router
  .get('/', (req, res, next) => postService.getPosts()
    .then((posts) => {
      console.log('success');
      console.log(posts);
      res.send(posts);
    })
    .catch(next))

export default router;