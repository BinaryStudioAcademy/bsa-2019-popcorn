import FollowerRepository from "../repository/follower.repository";
import { getCustomRepository } from "typeorm";

export const getFollowersCountByUserId = async (userId: string, next) => {
  return await getCustomRepository(
    FollowerRepository
  ).getFollowersCountByUserId(userId, next);
};

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

export const getFollowingsCountByUserId = async (userId: string, next) => {
  return await getCustomRepository(
    FollowerRepository
  ).getFollowingsCountByUserId(userId, next);
};

export const changeFollowStatus = async ({ userId, followerId }, next) => {
  return await getCustomRepository(FollowerRepository).changeFollowStatus(
    userId,
    followerId,
    next
  );
};

export const checkFollowStatus = async (userId, followerId, next) => {
  console.log("hello");
  return await getCustomRepository(FollowerRepository).checkFollowStatus(
    userId,
    followerId,
    next
  );
};
