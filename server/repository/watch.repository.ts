import { EntityRepository, Repository } from "typeorm";
import { Watch } from "../entities/Watch";

@EntityRepository(Watch)
class WatchRepository extends Repository<Watch> {
  async getByUserId(userId, next) {
    try {
      const watches = await this.find({
        where: { user: { id: userId } },
        order: { created_at: "DESC" }
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

      return { id: newWatch.id };
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async deleteById(watchId, next) {
    try {
      const deletedWatch = await this.delete({ id: watchId });

      return deletedWatch;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async changeStatus(watchId, next) {
    try {
      const watch = await this.findOne({ id: watchId });
      const status = watch.status === "watched" ? "to_watch" : "watched";
      const created_at = new Date();
      await this.update({ id: watchId }, { status, created_at });

      return { ...watch, status, created_at };
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }
}

export default WatchRepository;
