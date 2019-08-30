import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import PostReactionsRepository from "../repository/postReactions.repository";
import { PostReactions } from "../models/PostReactionsModel";

export class SeedPostReaction1565847243749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const reactionsSeed = new Array(25)
      .fill(true)
      .concat(new Array(25).fill(false))
      .map(smile => ({
        smile
      }));
    reactionsSeed.map(async reactionData => {
      const reaction = new PostReactions();
      // reaction.smile = reactionData.smile;
      const users = await getCustomRepository(UserRepository).find();
      reaction.user = users[Math.floor(Math.random() * users.length)];
      const posts = await getCustomRepository(PostRepository).find();
      reaction.post = posts[Math.floor(Math.random() * posts.length)];
      await getCustomRepository(PostReactionsRepository).save(reaction);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
