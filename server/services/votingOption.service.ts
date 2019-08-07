import VotingOptionRepository from "../repository/votingOption.repository";
import { getCustomRepository } from "typeorm";
import { VotingOption } from "models/VotingOptionModel";

export const getVotingOptionByVotingId = async (id: string): Promise<VotingOption[]> => {
  console.log(id);
  return await getCustomRepository(VotingOptionRepository).getVotingOptionByVotingId(id);
};