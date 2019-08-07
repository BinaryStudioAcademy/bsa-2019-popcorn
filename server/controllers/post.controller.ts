import { Router } from 'express';
import * as postService from '../services/post.service';
import { Post } from '../models/PostModel';

const router = Router();

router
  .get('/', (req, res, next) => postService.getPosts()
    .then( (posts: Post[]) => { res.send(posts) })
    .catch(next))
  .post('/', (req, res, next) => postService.createPost(req.body)
    .then( (response) => res.send(response) )
    .catch(next))

export default router;