import { EntityRepository, Repository } from "typeorm";
import { getCustomRepository } from "typeorm";
import UserRepository from "./user.repository";
import { VotingOptionReaction } from "../models/VotingOptionReaction";
import { VotingOptionReaction as VotingOptionReactionEntity } from "../entities/VotingOptionReaction";
import VotingOptionRepository from "./votingOption.repository";

@EntityRepository(VotingOptionReactionEntity)
class VotingOptionReactionRepository extends Repository<VotingOptionReaction> {
  async setVotingReaction(
    optionId: string,
    userId: string,
    isChosen: boolean,
    next?
  ) {
    try {
      const votingOption = await getCustomRepository(
        VotingOptionRepository
      ).findOne({ id: optionId });
      if (!votingOption)
        return next(
          { status: 404, message: "Voting Option is not found" },
          null
        );

      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      if (!user)
        return next({ status: 404, message: "User is not found" }, null);

      const prevReaction = await this.findOne({ user, votingOption });
      return prevReaction
        ? await this.update(prevReaction.id, { isChosen })
        : await this.save({ isChosen, votingOption, user });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default VotingOptionReactionRepository;
