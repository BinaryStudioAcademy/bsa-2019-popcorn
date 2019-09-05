import { getById as getMovieById } from "../repository/movieElastic.repository";
import EventRepository from "../repository/event.repository";
import { getReviewById } from "./review.service";
import { getTopById, getRandomTop } from "./top.service";
import {
  getRecommendedTops,
  getRecommendedEventsIds,
  getRecommendedSurveys,
  getRecommendedReviews
} from "../repository/recommended.repository";
import { getCustomRepository } from "typeorm";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getRecommended = async (userId, next) => {
  const topIds = await getRecommendedTops();
  const eventIds = await getRecommendedEventsIds(userId);
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
  const surveys = await getRecommendedSurveys();
  const reviewIds = await getRecommendedReviews(userId);
  const review =
    reviewIds.length > 0
      ? await getReviewById(
          userId,
          reviewIds[getRandomInt(reviewIds.length)].id,
          next
        )
      : undefined;

  let recommended = {
    reviews: review,
    tops: top,
    events: event,
    surveys: surveys
  };

  return recommended;
};
