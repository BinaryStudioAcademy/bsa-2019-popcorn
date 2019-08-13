import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import UserRepository from "../repository/user.repository";
import StoryRepository from "../repository/story.repository";
import { Story } from "../models/StoryModel";

const uuid = require("uuid/v4");

const default_url_story =
  "https://s3-alpha-sig.figma.com/img/e0c3/dd6e/d2d5bd4e0e1d9243f70ca5d2ba5f9130?Expires=1566172800&Signature=PZn4tI7Bfttzi9p9SM7hNsacTq8ul-9qr0c1X4n7MAFCDK8DIpdqN~YpdtLJO3ozvXCF1pWAxaOHdGkvIyuDdL5dYIVtgEOMf7S1oD5woUmPcF0C2PQ0p1mkMY5-QPEbrMy4e5~uuPvZo8XPaZaRypwBqNU7JPhZb8~6ZUt-xZJ8zum-lYmR4RWhPLfb02g3bPNCYRYw8c-Wuqr6WNfOQEeueUXyNl0HQCg9BK2hY3Lyz5s7FizfNzRVL9QZSsPdDbP-tbEZK~PUNlEPRn7Aw0JcEYMuJ1NuMoNOFHTYVvpFcKe0akNq9NDqDcWv2UaCB6NnsbxDIBejoN5EeuHozA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
const storyCaptions = [
  "Awesome story!",
  "Good film",
  "Awful horror",
  "Something interesting",
  "",
  "You should see it"
];

export class SeedStory1565606634607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let story;
    for (let i = 0; i < 100; i++) {
      story = new Story();
      story.id = uuid();
      story.caption = storyCaptions[i % storyCaptions.length];
      story.image_url = default_url_story;
      story.user = await getCustomRepository(UserRepository).findOne(
        "7f13634d-c353-433c-98fe-ead99e1252c7"
      );
      await getCustomRepository(StoryRepository).save(story);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
