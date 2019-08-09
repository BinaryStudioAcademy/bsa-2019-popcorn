import {Voting} from '../models/VotingModel';
import {VotingOption} from '../models/VotingOptionModel';
import VotingRepository from '../repository/voting.repository';
import {getCustomRepository} from "typeorm";

interface IRequestBody {
  userId: string,
  voting: Voting, 
  votingOptions: Array<VotingOption>
}

export const createVoting = async (body: IRequestBody, next): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).createVoting(body.userId, body.voting, body.votingOptions, next);
};

export const getVotingById = async (id: string, next): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).getVotingById(id, next);
}

export const getVotingByUserId = async (id: string, next): Promise<Voting[]> => {
  return await getCustomRepository(VotingRepository).getVotingByUserId(id, next);
}

export const getVotings = async (next): Promise<Voting[]> => {
    return await getCustomRepository(VotingRepository).getVotings(next);
};

export const updateVotingById = async (id: string, voting: Voting, next): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).updateVotingById(id, voting, next);
}

export const createVotingOptionByVotingId = async (id: string, votingOption: VotingOption, next): Promise<VotingOption> => {
  return await getCustomRepository(VotingRepository).createVotingOptionByVotingId(id, votingOption, next);
}

export const deleteVotingById = async (id: string, next): Promise<{ }> => {
  return await getCustomRepository(VotingRepository).deleteVotingById(id, next);
}
