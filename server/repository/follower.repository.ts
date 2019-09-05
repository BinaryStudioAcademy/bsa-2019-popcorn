import {
  EntityRepository,
  Repository,
} from "typeorm";
import { Follower } from "../entities/Follower";

@EntityRepository(Follower)
class FollowerRepository extends Repository<Follower> {
  async getFollowersCountByUserId(userId, next?): Promise<number> {
    try {
      return await this.createQueryBuilder("follower")
        .where(`follower.user.id = :id`, { id: userId })
        .getCount();
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getFollowersByUserId(userId, next?): Promise<Follower[]> {
    try {
      return await this.find({
        where: { user: { id: userId } },
        relations: ["follower"]
      });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getFollowingsCountByUserId(userId, next?): Promise<number> {
    try {
      return await this.createQueryBuilder("follower")
        .where(`follower.follower.id = :id`, { id: userId })
        .getCount();
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async getFollowingsByUserId(userId, next?): Promise<Follower[]> {
    try {
      return await this.find({
        where: { follower: { id: userId } },
        relations: ["user"]
      });
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async checkFollowStatus(
    userId,
    followerId,
    next?
  ): Promise<{ isFollower: boolean; isFollowing: boolean }> {
    try {
      const isFollower =
        (await this.find({
          where: { follower: { id: followerId }, user: { id: userId } }
        })).length > 0;

      const isFollowing =
        (await this.find({
          where: { follower: { id: userId }, user: { id: followerId } }
        })).length > 0;

      return { isFollower, isFollowing };
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }

  async changeFollowStatus(
    userId,
    followerId,
    next?
  ): Promise<{ isFollow: boolean }> {
    try {
      const subscription = await this.findOne({
        where: { user: { id: followerId }, follower: { id: userId } }
      });
      if (subscription) {
        await this.delete({ id: subscription.id });
        return { isFollow: false };
      } else {
        await this.save({ user: { id: followerId }, follower: { id: userId } });
        return { isFollow: true };
      }
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default FollowerRepository;
