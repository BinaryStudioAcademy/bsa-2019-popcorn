import {EntityRepository, Repository} from "typeorm";
import {VotingOption as VotingOptionEntity} from "../entities/VotingOption";
import {getCustomRepository} from "typeorm";
import { VotingOption } from "models/VotingOptionModel";
import VotingRepository from "./voting.repository";
import { Voting } from "models/VotingModel";

@EntityRepository(VotingOptionEntity)
class VotingOptionRepository extends Repository<VotingOption> {

  async createVotingOption(votingOption: VotingOption, voting?: Voting) {
    if (voting) 
      votingOption.voting = voting;
    return await this.save(votingOption);
  }

  async getVotingOptionByVotingId(id: string) {
    const voting = await getCustomRepository(VotingRepository).getVotingById(id)
    return await this.find({voting});
  }

  async updateVotingOptionById(id: string, votingOption: VotingOption) {
    await this.update({id}, votingOption);
    const updatedVotingOption = await this.findOne(id);
    return updatedVotingOption
      ? updatedVotingOption
      : { success: false };
  }

  async deleteVotingOptionById(id: string) {
    await this.delete({ id });
    return { success: true };
  }

}

export default VotingOptionRepository;
