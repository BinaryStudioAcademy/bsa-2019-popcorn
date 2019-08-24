import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Follower } from "../entities/Follower";

@EntityRepository(Follower)
class FollowerRepository extends Repository<Follower> {
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
