import FollowerRepository from "../repository/follower.repository";
import { getCustomRepository } from "typeorm";

export const getFollowersByUserId = async (userId: string, next) => {
  return await getCustomRepository(FollowerRepository).getFollowersByUserId(
    userId,
    next
  );
};

export const getFollowingsByUserId = async (userId: string, next) => {
  return await getCustomRepository(FollowerRepository).getFollowingsByUserId(
    userId,
    next
  );
};

export const changeFollowStatus = async ({ userId, followerId }, next) => {
  return await getCustomRepository(FollowerRepository).changeFollowStatus(
    userId,
    followerId,
    next
  );
};
