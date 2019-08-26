import { EntityRepository, Repository } from "typeorm";
import { Watch } from "../entities/Watch";

@EntityRepository(Watch)
class WatchRepository extends Repository<Watch> {
  async getByUserId(userId, next) {
    try {
      const watches = await this.find({
        where: { user: { id: userId } }
      });

      return watches;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async saveByUserId(userId, watch, next) {
    try {
      const newWatch = await this.save({
        user: { id: userId },
        ...watch
      });

      return newWatch;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async deleteById(watchId, next) {
    try {
      const deletedWatch = await this.remove(watchId);

      return deletedWatch;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }
}

export default WatchRepository;
