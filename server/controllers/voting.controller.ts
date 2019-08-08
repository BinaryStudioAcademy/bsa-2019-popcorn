import { Router } from 'express';
import * as votingService from '../services/voting.service';
import * as votingOptionService from '../services/votingOption.service';

const router = Router();

router
  .get('/', (req, res, next) => votingService.getVotings()
    .then(result => res.send(result))
    .catch(next))
  .get('/:id', (req, res, next) => votingService.getVotingById(req.params.id)
    .then(result => res.send(result))
    .catch(next))
  .get('/:id/options', (req, res, next) => votingOptionService.getVotingOptionByVotingId(req.params.id)
    .then(result => res.send(result))
    .catch(next))
  .get('/user/:id', (req, res, next) => votingService.getVotingByUserId(req.params.id)
    .then(result => res.send(result))
    .catch(next))
  .put('/:id', (req, res, next) => votingService.updateVotingById(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(next))
  .delete('/:id', (req, res, next) => votingService.deleteVotingById(req.params.id)
    .then(result => res.send(result))
    .catch(next))
  .post('/', (req, res, next) => votingService.createVoting(req.body)
    .then(result => res.send(result))
    .catch(next))

 export default router;
