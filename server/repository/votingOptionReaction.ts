import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import UserRepository from "./user.repository";
import { VotingOptionReaction } from "../models/VotingOptionReaction";
import { VotingOptionReaction as VotingOptionReactionEntity } from "../entities/VotingOptionReaction";
import VotingRepository from "./voting.repository";
import * as uuid from "uuid/v4";

@EntityRepository(VotingOptionReactionEntity)
class VotingOptionReactionRepository extends Repository<VotingOptionReaction> {
  async setVotingReaction(
    votingId: string,
    userId: string,
    optionId: string,
    next?
  ) {
    try {
      const voting = await getCustomRepository(VotingRepository).findOne({
        id: votingId
      });
      if (!voting) {
        return next({ status: 404, message: "Voting  is not found" }, null);
      }

      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }

      await this.createQueryBuilder()
        .where({ user, votingOption: { id: voting.id } })
        .delete();
      this.create({ id: uuid(), votingOption: { id: optionId }, user });
      return await getCustomRepository(VotingRepository).getVotingById(
        votingId
      );
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default VotingOptionReactionRepository;
