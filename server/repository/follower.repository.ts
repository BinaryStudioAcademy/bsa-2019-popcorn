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
}

export default FollowerRepository;
