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
        return next({ status: 404, message: "Voting is not found" }, null);
      }

      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }

      const reaction: VotingOptionReaction | undefined = await this.findOne({
        where: {
          user,
          voting: { id: votingId }
        },
        relations: ["votingOption", "votingOption.voting"]
      });

      if (reaction) {
        if (reaction.votingOption.id !== optionId) {
          await this.save({
            id: uuid(),
            votingOption: { id: optionId },
            user,
            voting: { id: votingId }
          });
          await this.delete(reaction);
        } else {
          await this.delete(reaction);
        }
      } else {
        await this.save({
          id: uuid(),
          votingOption: { id: optionId },
          user,
          voting: { id: votingId }
        });
      }

      return voting;
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default VotingOptionReactionRepository;
