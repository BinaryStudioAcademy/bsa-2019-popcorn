import { getRepository } from "typeorm";
import { Top } from "../entities/Top";
import { Event } from "../entities/Events/Event";
import { Surveys } from "../entities/Surveys";
import { Review } from "../entities/Review/Review";

export const getRecommendedTops = async () => {
  const tops = await getRepository(Top).query(`SELECT "top"."id" 
            FROM 
                (SELECT COUNT("followerId") AS fc,"follower"."userId" 
                FROM "follower"  
                GROUP BY "follower"."userId") t INNER JOIN "top" ON "t"."userId"="top"."userId" 
            WHERE fc>20`);
  return tops;
};

export const getRecommendedEventsIds = async id => {
  const events = await getRepository(Event).query(`SELECT "eventId"
        FROM "event_visitor" 
        WHERE "eventId" IN 
            (SELECT "eventId" 
             FROM "event_visitor" 
             WHERE "userId" IN
                 (SELECT "userId"
                  FROM "follower"
                  WHERE "followerId"= '${id}'
                 )
            LIMIT 3
            ) 
         GROUP BY "eventId" `);
  return events;
};

export const getRecommendedSurveys = async () => {
  const surveys = await getRepository(Surveys)
    .query(`SELECT DISTINCT "surveys"."id"
        FROM "surveys" INNER JOIN 
            ( SELECT * 
            FROM "surveys_question" INNER JOIN
                (SELECT COUNT("userId"), "surveysQuestionId"
                FROM (
                    SELECT "surveysQuestionId", "userId"
                    FROM "surveys_question_answer"
                    GROUP BY "surveysQuestionId", "userId"
                ) t 
             GROUP BY "surveysQuestionId"
        ) f ON "f"."surveysQuestionId"="surveys_question"."id") g ON "g"."surveysId"="surveys"."id"
            WHERE "count">10`);
  return surveys;
};

export const getRecommendedReviews = async id => {
  const reviews = await getRepository(Review).query(`SELECT "id"
    FROM "review" INNER JOIN (
        SELECT COUNT("isLike") AS likeCount, "reviewId"
        FROM "review_reaction"
        WHERE "isLike"=true
        GROUP BY "reviewId") t ON "review"."id"="t"."reviewId"
    WHERE "movieId" IN (SELECT "movieId"
                       FROM "watch" 
                       WHERE "userId"='${id}'
                       LIMIT 3)
    ORDER BY "likecount" DESC
    LIMIT 3`);
  return reviews;
};

export const getRandomPopularReviews = async () => {
  const reviews = await getRepository(Review).query(`SELECT "id" 
    FROM "review" INNER JOIN (
        SELECT COUNT("isLike") AS likeCount, "reviewId"
        FROM "review_reaction"
        WHERE "isLike"=true
        GROUP BY "reviewId") t ON "review"."id"="t"."reviewId"
    WHERE "likecount">5
    ORDER BY random()
    LIMIT 3`);
  return reviews;
};
