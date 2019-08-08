import {Voting} from '../models/VotingModel';
import {VotingOption} from '../models/VotingOptionModel';
import VotingRepository from '../repository/voting.repository';
import UserRepository from '../repository/user.repository';
import {getCustomRepository} from "typeorm";
import { User } from '../models/UserModel';

interface IRequestBody {
  userId: string,
  voting: Voting, 
  votingOptions: Array<VotingOption>
}

export const createVoting = async (body: IRequestBody): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).createVoting(body.userId, body.voting, body.votingOptions);
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

export const updateVotingById = async (id: string, voting: Voting): Promise<Voting | { success: boolean }> => {
  return await getCustomRepository(VotingRepository).updateVotingById(id, voting);
}

export const createVotingOptionByVotingId = async (id: string, votingOption: VotingOption): Promise<VotingOption> => {
  return await getCustomRepository(VotingRepository).createVotingOptionByVotingId(id, votingOption);
}

export const deleteVotingById = async (id: string): Promise<{ success: boolean }> => {
  return await getCustomRepository(VotingRepository).deleteVotingById(id);
}
