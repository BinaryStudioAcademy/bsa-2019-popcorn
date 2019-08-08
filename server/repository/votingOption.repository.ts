import {EntityRepository, Repository} from "typeorm";
import {VotingOption as VotingOptionEntity} from "../entities/VotingOption";
import {getCustomRepository} from "typeorm";
import { VotingOption } from "../models/VotingOptionModel";
import VotingRepository from "./voting.repository";
import { Voting } from "../models/VotingModel";

@EntityRepository(VotingOptionEntity)
class VotingOptionRepository extends Repository<VotingOption> {

  async createVotingOption(votingOption: VotingOption, next?, voting?: Voting) {
    try {
      if (voting) 
        votingOption.voting = voting;
      return await this.save(votingOption);
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }  
  }

  async getVotingOptionByVotingId(id: string, next?) {
    try {
      const voting = await getCustomRepository(VotingRepository).getVotingById(id, next);
      if(!voting) {
        return next({status: 404, message: 'Voting is not found'}, null);
      }
      return await this.find({voting});
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }

  async updateVotingOptionById(id: string, votingOption: VotingOption, next?) {
    try {
      await this.update({id}, votingOption);
      const updatedVotingOption = await this.findOne(id);
      return updatedVotingOption
        ? updatedVotingOption
        : next({status: 404, message: 'Voting Option is not found'}, null);
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }

  async deleteVotingOptionById(id: string, next?) {
    try {
      const votingOption = await this.findOne(id);
      if(!votingOption) {
        return next({status: 404, message: 'Voting Option is not found'}, null);
      }
      await this.delete({ id });
      return {};
    } catch(err) {
      return next({status: err.status, message: err.message}, null);
    }
  }
}

export default VotingOptionRepository;
