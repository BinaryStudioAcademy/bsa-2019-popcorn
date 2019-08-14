import { Voting } from "../models/VotingModel";
import { VotingOption } from "../models/VotingOptionModel";
import VotingRepository from "../repository/voting.repository";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";

const uuid = require("uuid/v4");

interface IRequestBody {
  userId: string;
  voting: Voting;
  votingOptions: Array<VotingOption>;
}

export const createVoting = async ({
  header,
  userId,
  deltaPositionHeadX,
  deltaPositionHeadY,
  deltaPositionOptionBlockX,
  deltaPositionOptionBlockY,
  backColor,
  backImage
}): Promise<Voting> => {
  const voting = new Voting();
  voting.id = uuid();
  voting.header = header;
  voting.user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  voting.deltaPositionHeadX = deltaPositionHeadX;
  voting.deltaPositionHeadY = deltaPositionHeadY;
  voting.deltaPositionOptionBlockX = deltaPositionOptionBlockX;
  voting.deltaPositionOptionBlockY = deltaPositionOptionBlockY;
  voting.backColor = backColor;
  voting.backImage = backImage;
  voting.votingOptions = [];

  return await getCustomRepository(VotingRepository).save(voting);
};

export const getVotingById = async (id: string, next): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).getVotingById(id, next);
};

export const getVotingByUserId = async (
  id: string,
  next
): Promise<Voting[]> => {
  return await getCustomRepository(VotingRepository).getVotingByUserId(
    id,
    next
  );
};

export const getVotings = async (next): Promise<Voting[]> => {
  return await getCustomRepository(VotingRepository).getVotings(next);
};

export const updateVotingById = async (
  id: string,
  voting: Voting,
  next
): Promise<Voting> => {
  return await getCustomRepository(VotingRepository).updateVotingById(
    id,
    voting,
    next
  );
};

export const createVotingOptionByVotingId = async (
  id: string,
  votingOption: VotingOption,
  next
): Promise<VotingOption> => {
  return await getCustomRepository(
    VotingRepository
  ).createVotingOptionByVotingId(id, votingOption, next);
};

export const deleteVotingById = async (id: string, next): Promise<{}> => {
  return await getCustomRepository(VotingRepository).deleteVotingById(id, next);
};
