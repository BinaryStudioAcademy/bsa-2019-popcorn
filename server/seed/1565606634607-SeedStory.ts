import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import UserRepository from "../repository/user.repository";
import StoryRepository from "../repository/story.repository";
import { Story } from "../models/StoryModel";

const storyCaptions = [
  "Awesome story!",
  "Good film",
  "Awful horror",
  "Something interesting",
  "You should see it",
  "COOOLLLLL !!!!!!",
  "Amazing",
  "I don`t like it !!!",
  "Best in the",
  "Ada Ada Ada 🥰🥰🥰",
  "Whaaaaaaaaaat ???👀👀👀👀",
  "Oh sweet Jesus..."
];

export class SeedStory1565606634607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const storySeed = [
      "https://i.imgur.com/o8Rh8cl.jpg",
      "https://i.imgur.com/ZAlb6Ho.jpg",
      "https://i.imgur.com/WwzxGK0.png",
      "https://i.imgur.com/VVNNYyQ.jpg",
      "https://i.imgur.com/JUvRk3m.jpg",
      "https://i.imgur.com/3yg29Um.jpg",
      "https://i.imgur.com/SKB3aYr.jpg",
      "https://i.imgur.com/YWMftDS.jpg",
      "https://i.imgur.com/JIO9NDe.jpg",
      "https://i.imgur.com/2Q2oVx6.jpg",
      "https://i.imgur.com/P1LeOb1.jpg",
      "https://i.imgur.com/lNBp07l.jpg",
      "https://i.imgur.com/qegQqYi.jpg",
      "https://i.imgur.com/VImODGo.jpg",
      "https://i.imgur.com/3EdFMIJ.jpg",
      "https://i.imgur.com/ms8SNS1.jpg",
      "https://i.imgur.com/ATWRv26.png",
      "https://i.imgur.com/T2ZKWFW.jpg",
      "https://i.imgur.com/OyCSAkv.jpg",
      "https://i.imgur.com/TUX1dIf.jpg",
      "https://i.imgur.com/IDR6l4J.jpg",
      "https://i.imgur.com/0MdFJjP.jpg"
    ];

    storySeed.map(async imageUrl => {
      const story = new Story();
      story.caption =
        storyCaptions[Math.floor(Math.random() * storyCaptions.length)];
      story.image_url = imageUrl;
      story.backgroundColor = "rgba(200, 13, 55, 1)";
      story.testPositionX = 5;
      story.testPositionY = 25;
      story.fontColor = "rgba(12, 33, 132, 1)";
      const users = await getCustomRepository(UserRepository).find();
      story.user = users[Math.floor(Math.random() * users.length)];
      await getCustomRepository(StoryRepository).save(story);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
