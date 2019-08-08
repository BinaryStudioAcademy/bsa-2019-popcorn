import VotingOptionRepository from "../repository/votingOption.repository";
import { getCustomRepository } from "typeorm";
import { VotingOption } from "models/VotingOptionModel";

export const getVotingOptionByVotingId = async (id: string): Promise<VotingOption[]> => {
  return await getCustomRepository(VotingOptionRepository).getVotingOptionByVotingId(id);
};

export const updateVotingOptionById = async (id: string, votingOption: VotingOption): Promise<VotingOption | {success: boolean }> => {
  return await getCustomRepository(VotingOptionRepository).updateVotingOptionById(id, votingOption);
}

export const deleteVotingOptionById = async (id: string): Promise<{ success: boolean }> => {
  return await getCustomRepository(VotingOptionRepository).deleteVotingOptionById(id);
}
