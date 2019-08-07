import {Voting} from '../models/VotingModel';
import {VotingOption} from '../models/VotingOptionModel';
import VotingRepository from '../repository/voting.repository';
import UserRepository from '../repository/user.repository';
import {getCustomRepository} from "typeorm";
import { User } from '../models/UserModel';

interface IRequestBody {
  userId: string,
  voting: Voting, 
  options: Array<VotingOption>
}

export const createVoting = async (body: IRequestBody): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).createVoting(body.userId, body.voting)
};

export const getVotingById = async (id: string): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).getVotingById(id);
}

export const getVotingByUserId = async (id: string): Promise<Voting[]> => {
  return await getCustomRepository(VotingRepository).getVotingByUserId(id);
}

export const getVotings = async (): Promise<Voting[]> => {
    return await getCustomRepository(VotingRepository).getVotings();
};
