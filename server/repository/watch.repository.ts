import { EntityRepository, Repository } from "typeorm";
import { Watch } from "../entities/Watch";

@EntityRepository(Watch)
class WatchRepository extends Repository<Watch> {}

export default WatchRepository;
