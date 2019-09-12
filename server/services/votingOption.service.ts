import VotingOptionRepository from "../repository/votingOption.repository";
import { getCustomRepository } from "typeorm";
import { VotingOption } from "../models/VotingOptionModel";
import VotingOptionReactionRepository from "../repository/votingOptionReaction";

export const getVotingOptionByVotingId = async (
  id: string
): Promise<VotingOption[]> => {
  return await getCustomRepository(
    VotingOptionRepository
  ).getVotingOptionByVotingId(id);
};

export const updateVotingOptionById = async (
  id: string,
  votingOption: VotingOption,
  next
): Promise<VotingOption> => {
  return await getCustomRepository(
    VotingOptionRepository
  ).updateVotingOptionById(id, votingOption, next);
};

export const deleteVotingOptionById = async (id: string, next): Promise<{}> => {
  return await getCustomRepository(
    VotingOptionRepository
  ).deleteVotingOptionById(id, next);
};

export const setVotingReaction = async (
  votingId: string,
  { userId, optionId },
  next
): Promise<any> => {
  const voting = await getCustomRepository(
    VotingOptionReactionRepository
  ).setVotingReaction(votingId, userId, optionId, next);
  voting.options = await getVotingOptionByVotingId(votingId);
  return voting;
};
