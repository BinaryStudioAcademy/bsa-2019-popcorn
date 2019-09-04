import { getAllUserWatch } from "./watch.service";
import FollowerRepository from "../repository/follower.repository";
import EventRepository from "../repository/event.repository";
import { getReviewById } from "./review.service";
import { getTopById } from "./top.service";
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
  const event = await getCustomRepository(EventRepository).getEvent(
    eventIds[getRandomInt(eventIds.length)].eventId
  );
  const top = await getTopById(topIds[getRandomInt(topIds.length)].id);
  const surveys = await getRecommendedSurveys();
  const reviewIds = await getRecommendedReviews(userId);
  const review = await getReviewById(
    userId,
    reviewIds[getRandomInt(reviewIds.length)].id,
    next
  );
  let recommended = {
    reviews: review,
    tops: top,
    events: event,
    surveys: surveys
  };

  return recommended;
};
