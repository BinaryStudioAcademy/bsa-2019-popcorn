import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import PostCommentsRepository from "../repository/postComments.repository";
import { PostCommentsModel } from "../models/PostCommentsModel";

export class SeedPostComments1565823065222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const commentsSeed = [
      "COOOLLLLL !!!!!!",
      "Amazing",
      "I don`t like it !!!",
      "Best in the",
      "Ada Ada Ada 🥰🥰🥰",
      "Whaaaaaaaaaat ???👀👀👀👀",
      "Oh sweet Jesus...",
      "When does RUN start?",
      "2020 has an incredible line up!! HBO remains on top!",
      "Succession was dope. Good job",
      "Yasss! Now release next part.",
      "best show",
      "best show ever",
      "Fingers crossed",
      "Like it 🧡💜🔥👌"
    ];
    commentsSeed.map(async commentData => {
      const comment = new PostCommentsModel();
      comment.text = commentData;
      const users = await getCustomRepository(UserRepository).find();
      comment.user = users[Math.floor(Math.random() * users.length)];
      const posts = await getCustomRepository(PostRepository).find();
      comment.post = posts[Math.floor(Math.random() * posts.length)];
      await getCustomRepository(PostCommentsRepository).save(comment);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
