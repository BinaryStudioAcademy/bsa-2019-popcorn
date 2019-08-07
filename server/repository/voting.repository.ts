import {EntityRepository, Repository} from "typeorm";
import {Voting} from "../entities/Voting";
import UserRepository from "./user.repository";
import {getCustomRepository} from "typeorm";

@EntityRepository(Voting)
class VotingRepository extends Repository<Voting> {

  async createVoting(id: string, voting: Voting) {
    voting.user = await getCustomRepository(UserRepository).findOne(id); 
    return await this.save(voting);;
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

}

export default VotingRepository;
