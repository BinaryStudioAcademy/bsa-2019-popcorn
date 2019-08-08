import VotingOptionRepository from "../repository/votingOption.repository";
import { getCustomRepository } from "typeorm";
import { VotingOption } from "models/VotingOptionModel";

export const getVotingOptionByVotingId = async (id: string, next): Promise<VotingOption[]> => {
  return await getCustomRepository(VotingOptionRepository).getVotingOptionByVotingId(id, next);
};

export const updateVotingOptionById = async (id: string, votingOption: VotingOption, next): Promise<VotingOption> => {
  return await getCustomRepository(VotingOptionRepository).updateVotingOptionById(id, votingOption, next);
}

export const deleteVotingOptionById = async (id: string, next): Promise<{}> => {
  return await getCustomRepository(VotingOptionRepository).deleteVotingOptionById(id, next);
}
