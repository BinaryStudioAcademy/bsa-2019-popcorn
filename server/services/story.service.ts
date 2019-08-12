import { Story } from '../models/StoryModel'
import { getRepository, getCustomRepository } from "typeorm";
import StoryRepository from '../repository/story.repository'

export const getStories = async():Promise<Array<Story>> => await getCustomRepository(StoryRepository).find({relations: ['user']});

export const getStorybyId = async(storyId:string):Promise<Story> => await getCustomRepository(StoryRepository).findOne(storyId);

export const createStory = async(story:Story):Promise<Story> => await getCustomRepository(StoryRepository).save(story);

export const updateStory = async(story:Story):Promise<Story> => await getCustomRepository(StoryRepository).save(story);

export const deleteStoryById = async(storyId:string):Promise<Story> => {
    let story = await getCustomRepository(StoryRepository).findOne(storyId);
    return await getCustomRepository(StoryRepository).remove(story);
}