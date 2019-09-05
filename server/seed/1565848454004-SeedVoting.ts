import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import VotingRepository from "../repository/voting.repository";
import VotingOptionRepository from "../repository/votingOption.repository";
import StoryRepository from "../repository/story.repository";
import { Story } from "../models/StoryModel";

import { Voting } from "../models/VotingModel";
import { VotingOption } from "../models/VotingOptionModel";

export class SeedVoting1565848454004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const vote = new Voting();
    vote.header = "John Wick";
    vote.backColor = "rgba(24,24,172,1)";
    vote.deltaPositionHeadX = 58;
    vote.deltaPositionHeadY = 185;
    vote.deltaPositionOptionBlockX = 0;
    vote.deltaPositionOptionBlockY = 0;
    const users = await getCustomRepository(UserRepository).find();
    const creator = users[Math.floor(Math.random() * users.length)];
    vote.user = creator;
    await getCustomRepository(VotingRepository).save(vote);
    const firstOption = new VotingOption();
    firstOption.voting = vote;
    firstOption.body = "COOL";
    await getCustomRepository(VotingOptionRepository).save(firstOption);
    const secondOption = new VotingOption();
    secondOption.voting = vote;
    secondOption.body = "NO";
    await getCustomRepository(VotingOptionRepository).save(secondOption);
    const story = new Story();
    story.backgroundColor = "rgba(213,91,5,1)";
    story.textPositionX = 10;
    story.textPositionY = 44;
    story.fontColor = "rgba(120, 33, 112, 1)";
    story.caption = "New John Wick";
    story.type = "voting";
    story.activityId = vote.id;
    story.user = creator;
    await getCustomRepository(StoryRepository).save(story);

    const vote1 = new Voting();
    vote1.header = "Papillion";
    vote1.backColor = "rgba(121, 1, 181, 1)";
    vote1.deltaPositionHeadX = 58;
    vote1.deltaPositionHeadY = 185;
    vote1.deltaPositionOptionBlockX = 0;
    vote1.deltaPositionOptionBlockY = 0;
    const users1 = await getCustomRepository(UserRepository).find();
    const creator1 = users1[Math.floor(Math.random() * users1.length)];
    vote1.user = creator1;
    await getCustomRepository(VotingRepository).save(vote1);
    const firstOption1 = new VotingOption();
    firstOption1.voting = vote1;
    firstOption1.body = "GREAT";
    await getCustomRepository(VotingOptionRepository).save(firstOption1);
    const secondOption1 = new VotingOption();
    secondOption1.voting = vote1;
    secondOption1.body = "NO";
    await getCustomRepository(VotingOptionRepository).save(secondOption1);
    const story1 = new Story();
    story1.backgroundColor = "rgba(21,240,80,1)";
    story1.textPositionX = 0;
    story1.textPositionY = 12;
    story1.fontColor = "rgba(4, 204, 98, 1)";
    story1.caption = "Greate or greate ?";
    story1.type = "voting";
    story1.activityId = vote1.id;
    story1.user = creator1;
    await getCustomRepository(StoryRepository).save(story1);

    const story3 = new Story();
    story3.backgroundColor = "rgba(123,154,71,1)";
    story3.textPositionX = 5;
    story3.textPositionY = 15;
    story3.fontColor = "rgba(120, 33, 132, 1)";
    story3.caption = "Axax😂";
    story3.image_url = "https://i.imgur.com/db7C54t.jpg";
    const users3 = await getCustomRepository(UserRepository).find();
    story3.user = users3[Math.floor(Math.random() * users3.length)];
    await getCustomRepository(StoryRepository).save(story3);

    const vote2 = new Voting();
    vote2.header = "Euphoria ?";
    vote2.backColor = "rgba(183, 189, 30, 0.9)";
    vote2.deltaPositionHeadX = 58;
    vote2.deltaPositionHeadY = 185;
    vote2.deltaPositionOptionBlockX = 0;
    vote2.deltaPositionOptionBlockY = 0;
    const users2 = await getCustomRepository(UserRepository).find();
    const creator2 = users1[Math.floor(Math.random() * users2.length)];
    vote2.user = creator2;
    await getCustomRepository(VotingRepository).save(vote2);
    const firstOption2 = new VotingOption();
    firstOption2.voting = vote2;
    firstOption2.body = "AWFUL";
    await getCustomRepository(VotingOptionRepository).save(firstOption2);
    const secondOption2 = new VotingOption();
    secondOption2.voting = vote2;
    secondOption2.body = "GREATE";
    await getCustomRepository(VotingOptionRepository).save(secondOption2);
    const story2 = new Story();
    story2.backgroundColor = "rgba(50,115,201,1)";
    story2.textPositionX = 10;
    story2.textPositionY = 60;
    story2.fontColor = "rgba(100, 100, 2, 1)";
    story2.caption = "Euphoria ?";
    story2.type = "voting";
    story2.activityId = vote2.id;
    story2.user = creator2;
    await getCustomRepository(StoryRepository).save(story2);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
