import EventRepository from "../repository/event.repository";
import SurveysRepository from "../repository/surveys.repository";
import { getReviewById } from "./review.service";
import { getTopById, getRandomTop } from "./top.service";
import {
  getRecommendedTops,
  getRecommendedEventsIds,
  getRecommendedSurveys,
  getRecommendedReviews,
  getRandomPopularReviews
} from "../repository/recommended.repository";
import { getCustomRepository } from "typeorm";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getRecommended = async (userId, next) => {
  const topIds = await getRecommendedTops();
  const eventIds = await getRecommendedEventsIds(userId);
  const surveyIds = await getRecommendedSurveys();
  let reviewIds = await getRecommendedReviews(userId);
  const event =
    eventIds > 0
      ? await getCustomRepository(EventRepository).getEvent(
          eventIds[getRandomInt(eventIds.length)].eventId
        )
      : await getCustomRepository(EventRepository).getRandomEvent();
  const top =
    topIds.length > 0
      ? await getTopById(topIds[getRandomInt(topIds.length)].id)
      : await getRandomTop();
  const survey =
    surveyIds.length > 0
      ? await getCustomRepository(SurveysRepository).getSurveysById(
          surveyIds[getRandomInt(surveyIds.length)].id
        )
      : await getCustomRepository(SurveysRepository).getNewestSurvey();
  let randomReviewIds =
    reviewIds.length > 0 ? undefined : await getRandomPopularReviews();
  const review =
    reviewIds.length > 0
      ? await getReviewById(
          userId,
          reviewIds[getRandomInt(reviewIds.length)].id,
          next
        )
      : await getReviewById(
          userId,
          randomReviewIds[getRandomInt(randomReviewIds.length)].id,
          next
        );
  let recommended = {
    reviews: review,
    tops: top,
    events: event,
    surveys: survey
  };

  return recommended;
};
