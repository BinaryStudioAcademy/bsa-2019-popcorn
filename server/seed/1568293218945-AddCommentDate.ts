import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import PostCommentsRepository from "../repository/postComments.repository";

export class AddCommentDate1568293218945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = await getCustomRepository(PostCommentsRepository);
    const comments = await repository.find();
    await Promise.all(
      comments.map(async comment => {
        repository.update(comment, { createdAt: new Date() });
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
