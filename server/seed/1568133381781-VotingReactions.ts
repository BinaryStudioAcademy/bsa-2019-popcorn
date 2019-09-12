import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import VotingRepository from "../repository/voting.repository";
import UserRepository from "../repository/user.repository";
import VotingOptionReactionRepository from "../repository/votingOptionReaction";
import { VotingOptionReaction } from "../models/VotingOptionReaction";
import * as uuid from "uuid/v4";
import VotingOptionRepository from "../repository/votingOption.repository";

export class VotingReactions1568133381781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const votings: any = await getCustomRepository(VotingRepository).find();
    await Promise.all(
      votings.map(async voting => {
        voting.votingOptions = await getCustomRepository(
          VotingOptionRepository
        ).find({ voting });
      })
    );

    const users = await getCustomRepository(UserRepository).find();

    const votingReactionRepository = await getCustomRepository(
      VotingOptionReactionRepository
    );
    votings.forEach(voting => {
      users.forEach(user => {
        const reaction = new VotingOptionReaction();
        reaction.id = uuid();
        reaction.user = user;
        reaction.voting = voting;
        reaction.votingOption =
          voting.votingOptions[
            Math.floor(Math.random() * voting.votingOptions.length)
          ];
        votingReactionRepository.save(reaction);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
