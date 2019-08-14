import { Story } from "../models/StoryModel";
import { getRepository, getCustomRepository } from "typeorm";
import StoryRepository from "../repository/story.repository";
import UserRepository from "../repository/user.repository";
const uuid = require("uuid/v4");

export const getStories = async (): Promise<Array<Story>> =>
  await getCustomRepository(StoryRepository).find({ relations: ["user"] });

export const getStorybyId = async (storyId: string): Promise<Story> =>
  await getCustomRepository(StoryRepository).findOne(storyId);

export const createStory = async ({
  userId,
  caption,
  image_url,
  type,
  activityId
}): Promise<Story> => {
  let story = new Story();
  story.id = uuid();
  story.user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  story.caption = caption;
  story.image_url = image_url;
  story.type = type;
  story.activityId = activityId;

  return getCustomRepository(StoryRepository).save(story);
};

export const updateStory = async (story: Story): Promise<Story> =>
  await getCustomRepository(StoryRepository).save(story);

export const deleteStoryById = async (storyId: string): Promise<Story> => {
  let story = await getCustomRepository(StoryRepository).findOne(storyId);
  return await getCustomRepository(StoryRepository).remove(story);
};
