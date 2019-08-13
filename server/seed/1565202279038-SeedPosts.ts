import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import { Post } from "../models/PostModel";
const uuid = require("uuid/v4");

const mock_post_url =
  "https://ichef.bbci.co.uk/news/660/cpsprodpb/462C/production/_107846971_lion_king_disney.jpg";
export class SeedPosts1565202279038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const post = new Post();
    post.id = uuid();
    post.title = "title-example";
    post.description = "description-example";
    post.image_url = mock_post_url;
    post.user = await getCustomRepository(UserRepository).findOne(
      "7f13634d-c353-433c-98fe-ead99e1252c7"
    );
    await getCustomRepository(PostRepository).save(post);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
