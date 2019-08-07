import { Router } from 'express';
import * as userService from '../services/user.service';

const router = Router();

router
  .get('/', (req, res, next) => userService.getUsers()
    .then(users => res.send(users))
    .catch(next))
  .get('/:id', (req, res, next) => userService.getUserById(req.params.id)
    .then(user => res.send(user))
    .catch(next))
  .put('/:id', (req, res, next) => userService.updateById(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(next))
  .delete('/:id', (req, res, next) => userService.deleteById(req.params.id)
    .then(result => res.send(result))
    .catch(next))

export default router;
