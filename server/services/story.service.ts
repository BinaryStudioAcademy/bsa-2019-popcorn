import { Story } from "../models/StoryModel";
import { getCustomRepository } from "typeorm";
import StoryRepository from "../repository/story.repository";
import UserRepository from "../repository/user.repository";
import { getVotingById } from "./voting.service";

const uuid = require("uuid/v4");

export const getStories = async (): Promise<Array<Story>> => {
  const stories = await getCustomRepository(StoryRepository).find({
    relations: ["user"]
  });
  return Promise.all(
    stories.map(async item => {
      let story: any = { ...item };
      switch (story.type) {
        case "voting":
          story.voting = await getVotingById(story.activityId);
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
  activity
}): Promise<any> => {
  let story: any = new Story();
  story.id = uuid();
  story.user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  story.caption = caption;
  story.image_url = image_url;
  story.type = type;
  story.activityId = activityId;

  await getCustomRepository(StoryRepository).save(story);

  if (type === "voting") {
    story.voting = await getVotingById(activityId);
  } else if (type) {
    story.activity = activity.name;
  }

  return story;
};

export const updateStory = async (story: Story): Promise<Story> =>
  await getCustomRepository(StoryRepository).save(story);

export const deleteStoryById = async (storyId: string): Promise<Story> => {
  let story = await getCustomRepository(StoryRepository).findOne(storyId);
  return await getCustomRepository(StoryRepository).remove(story);
};
