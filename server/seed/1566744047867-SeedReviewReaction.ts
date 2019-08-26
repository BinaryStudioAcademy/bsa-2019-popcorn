import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import ReviewRepository from "../repository/review.repository";
import UserRepository from "../repository/user.repository";
import { ReviewReaction } from "../models/Review/ReviewReactionModel";
import ReviewReactionRepository from "../repository/reviewReaction.repository";

export class SeedReviewReaction1566744047867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const reviews = await getCustomRepository(ReviewRepository).find({
      relations: ["user"]
    });
    const users = await getCustomRepository(UserRepository).find();
    const reactions = [true, true, true, false, false];

    for (let i = 0; i < reviews.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (reviews[i].user.id === users[j].id) {
          continue;
        }
        const newReaction = new ReviewReaction();
        newReaction.review = reviews[i];
        newReaction.user = users[j];
        newReaction.isLike =
          reactions[Math.floor(Math.random() * reactions.length)];

        await getCustomRepository(ReviewReactionRepository).save(newReaction);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
