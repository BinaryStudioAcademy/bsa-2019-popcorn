import {EntityRepository, Repository} from "typeorm";
import {Voting} from "../entities/Voting";
import UserRepository from "./user.repository";
import {getCustomRepository} from "typeorm";
import { VotingOption } from "models/VotingOptionModel";
import VotingOptionRepository from "./votingOption.repository";


@EntityRepository(Voting)
class VotingRepository extends Repository<Voting> {

  async createVoting(id: string, voting: Voting, votingOptions: Array<VotingOption>) {
    voting.user = await getCustomRepository(UserRepository).findOne(id); 
    await Promise.all(votingOptions.map(votingOption => getCustomRepository(VotingOptionRepository).createVotingOption(votingOption)));
    voting.votingOptions = votingOptions;
    return await this.save(voting);
  }

  async getVotings() {
    return await this.find();
  }

  async getVotingById(id: string) {
    return await this.findOne(id);
  }

  async getVotingByUserId(id: string) {
    const user = await getCustomRepository(UserRepository).findOne(id);
    return await this.find({user});
  }

  async updateVotingById(id: string, voting: Voting) {
    await this.update({ id }, voting);
    const updatedVoting = await this.getVotingById(id);
    return updatedVoting
      ? updatedVoting
      : { success: false };
  }

  async deleteVotingById(id: string) {
    await this.delete({ id });
    return { success: true };
  }

  async createVotingOptionByVotingId(id: string, votingOption: VotingOption) {
    const voting = await this.getVotingById(id);
    const newOption = await getCustomRepository(VotingOptionRepository).createVotingOption(votingOption, voting);
    voting.votingOptions = await getCustomRepository(VotingOptionRepository).getVotingOptionByVotingId(id);
    await this.save(voting);
    return newOption;
  }
}

export default VotingRepository;
