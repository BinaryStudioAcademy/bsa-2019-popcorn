import { Router, response } from 'express';
import * as postService from '../services/post.service';
import { Post } from '../models/PostModel';

const router = Router();

router
  .get('/', (req, res, next) => postService.getPosts()
    .then((posts: Post[]) => res.send(posts))
    .catch(next))
  .get('/:id', (req, res, next) => postService.getPostsById(req.params.id)
    .then((post: Post) => res.send(post))
    .catch(next))
  .post('/', (req, res, next) => postService.createPost(req.body)
    .then((response) => res.send(response))
    .catch(next))
  .delete('/:id', (req, res, next) => postService.deletePostById(req.params.id)
    .then((response: Post) => res.send(response))
    .catch(next))

export default router;