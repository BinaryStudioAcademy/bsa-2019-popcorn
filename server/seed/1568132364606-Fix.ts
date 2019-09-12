import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import SurveysQuestionRepository from "../repository/surveysQuestion.repository";

export class Fix1568132364606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getCustomRepository(SurveysQuestionRepository).update(
      { title: "2. HBO VS NETFLIX" },
      {
        title: "2. What do you think about Game Of Thrones",
        firstLabel: "Awful",
        lastLabel: "Amazing"
      }
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
