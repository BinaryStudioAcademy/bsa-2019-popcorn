import {EntityRepository, Repository} from "typeorm";
import {VotingOption as VotingOptionEntity} from "../entities/VotingOption";
import {getCustomRepository} from "typeorm";
import { VotingOption } from "models/VotingOptionModel";
import VotingRepository from "./voting.repository";

@EntityRepository(VotingOptionEntity)
class VotingOptionRepository extends Repository<VotingOption> {
  async createVotingOption(votingOption: VotingOption) {
    return await this.save(votingOption);
  }
  async getVotingOptionByVotingId(id: string) {
    const voting = await getCustomRepository(VotingRepository).getVotingById(id)
    return await this.find({voting});
  }
}

export default VotingOptionRepository;
