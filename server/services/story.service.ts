import { Story } from "../models/StoryModel";
import { getCustomRepository } from "typeorm";
import StoryRepository from "../repository/story.repository";
import UserRepository from "../repository/user.repository";
import { getVotingById } from "./voting.service";
import { getMovieById } from "./movie.service";

import * as uuid from "uuid/v4";
import { getSurveysById } from "./surveys.service";
import { getEventById } from "./event.service";
import { getTopById } from "./top.service";

export const getStories = async (): Promise<Story[]> => {
  let activity;
  const stories = (await getCustomRepository(StoryRepository).find({
    relations: ["user"]
  })).reverse();
  return Promise.all(
    stories.map(async item => {
      const story: any = { ...item };
      switch (story.type) {
        case "voting":
          story.voting = await getVotingById(story.activityId);
          break;
        case "survey":
          activity = await getSurveysById(story.activityId, () => {});
          story.activity = activity && activity.title;
          break;
        case "event":
          activity = await getEventById(story.activityId);
          story.activity = activity && activity.title;
          break;
        case "top":
          activity = await getTopById(story.activityId);
          story.activity = activity && activity.title;
          break;
        default:
          break;
      }
      if (story.movieId) {
        story.movie = await getMovieById(story.movieId);
      }

      return story;
    })
  );
};

export const getStorybyId = async (storyId: string): Promise<Story> =>
  await getCustomRepository(StoryRepository).findOne(storyId);

export const createStory = async ({
  userId,
  caption,
  image_url,
  type,
  activityId,
  activity,
  movieId,
  movieOption,
  backgroundColor,
  fontColor,
  textPositionX,
  textPositionY
}): Promise<any> => {
  const story: any = new Story();
  story.id = uuid();
  story.user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  story.caption = caption;
  story.image_url = image_url;
  story.type = type;
  story.activityId = activityId;
  story.movieId = movieId;
  story.movieOption = movieOption;
  story.backgroundColor = backgroundColor;
  story.fontColor = fontColor;
  story.textPositionX = textPositionX;
  story.textPositionY = textPositionY;

  await getCustomRepository(StoryRepository).save(story);

  if (type === "voting") {
    story.voting = await getVotingById(activityId);
  } else if (type) {
    story.activity = activity.name;
  }
  if (movieId) {
    story.movie = await getMovieById(movieId);
  }

  return story;
};

export const updateStory = async (story: Story): Promise<Story> =>
  await getCustomRepository(StoryRepository).save(story);

export const deleteStoryById = async (storyId: string): Promise<Story> => {
  const story = await getCustomRepository(StoryRepository).findOne(storyId);
  return await getCustomRepository(StoryRepository).remove(story);
};
