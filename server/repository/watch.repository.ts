import { EntityRepository, Repository } from "typeorm";
import { Watch } from "../entities/Watch";

@EntityRepository(Watch)
class WatchRepository extends Repository<Watch> {
  getByUserId(userId: string, next) {
    try {
      const watches = this.find({
        where: { user: { id: userId } }
      });

      return watches;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }
}

export default WatchRepository;
