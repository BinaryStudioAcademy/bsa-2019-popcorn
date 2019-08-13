import { Router } from 'express';
import * as surveysService from '../services/surveys.service';
import * as surveysQuestionService from '../services/surveysQuestion.service';
import * as surveysQuestionAnwerService from '../services/surveysQuestionAnswer.service';
import * as surveysQuestionOptionService from '../services/surveysQuestionOption.service';
import errorHandlerMiddleware from '../middlewares/error-handler.middleware';

const router = Router();

router
  //CRUD SURVEYS
  .post('/', errorHandlerMiddleware, (req, res, next) => surveysService.createSurveys(req.body, next)
    .then(result => res.send(result))
    .catch(next))
  .get('/', errorHandlerMiddleware, (req, res, next) => surveysService.getSurveys(next)
    .then(result => res.send(result))
    .catch(next))
  .get('/:id', errorHandlerMiddleware, (req, res, next) => surveysService.getSurveysById(req.params.id, next)
    .then(result => res.send(result))
    .catch(next))
  .delete('/:id', errorHandlerMiddleware, (req, res, next) => surveysService.deleteSurveysById(req.params.id, next)
    .then(result => res.send(result))
  .catch(next))
  .put('/:id', errorHandlerMiddleware, (req, res, next) => surveysService.updateSurveysById(req.params.id, req.body, next)
    .then(result => res.send(result))
  .catch(next))
  .get('/user/:id', errorHandlerMiddleware, (req, res, next) => surveysService.getSurveysByUserId(req.params.id, next)
    .then(result => res.send(result))
  .catch(next))
  //CRUD SURVEYS QUESTIONS

  .get('/:id/question', errorHandlerMiddleware, (req, res, next) => surveysQuestionService.getSurveysQuestionBySurveysId(req.params.id, next)
    .then(result => res.send(result))
    .catch(next))
  .get('/question/:id', errorHandlerMiddleware, (req, res, next) => surveysQuestionService.getSurveysQuestionById(req.params.id, next)
    .then(result => res.send(result))
  .catch(next))
  .put('/question/:id', errorHandlerMiddleware, (req, res, next) => surveysQuestionService.updateSurveysQuestionById(req.params.id, req.body, next)
    .then(result => res.send(result))
    .catch(next))
  .delete('/question/:id', errorHandlerMiddleware, (req, res, next) => surveysQuestionService.deleteSurveysQuestionById(req.params.id, next)
    .then(result => res.send(result))
    .catch(next))

  //CRUD SURVEYS QUESTIONS OPTION
  .get('/:id/option', errorHandlerMiddleware, (req, res, next) => surveysQuestionOptionService.getQuestionOptionByQuestionId(req.params.id, next)
    .then(result => res.send(result))
    .catch(next))
  .put('/option/:id', errorHandlerMiddleware, (req, res, next) => surveysQuestionOptionService.updateQuestionOptionById(req.params.id, req.body, next)
    .then(result => res.send(result))
  .catch(next))
  .delete('/option/:id', errorHandlerMiddleware, (req, res, next) => surveysQuestionOptionService.deleteQuestionOptionById(req.params.id, next)
    .then(result => res.send(result))
  .catch(next))

  //CRUD SURVEYS QUESTIONS Answer
  .post('/answer', errorHandlerMiddleware, (req, res, next) => surveysQuestionAnwerService.setQuestionAnswer(req.body, next)
    .then(result => res.send(result))
  .catch(next))

  .get('*', (req,res) => res.send('Not Found'))

 export default router;