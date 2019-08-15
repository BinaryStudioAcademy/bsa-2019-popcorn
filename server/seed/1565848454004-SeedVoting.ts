import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import VotingRepository from "../repository/voting.repository";
import VotingOptionRepository from "../repository/votingOption.repository";
import VotingOptionReactionRepository from "../repository/votingOptionReaction";
import { Voting } from "../models/VotingModel";
import { VotingOption } from "../models/VotingOptionModel";
import { VotingOptionReaction } from "../models/VotingOptionReaction";

export class SeedVoting1565848454004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const votingSeed = [
      {
        body: "Cool ?"
      }
    ];
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
