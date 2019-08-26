import { EntityRepository, Repository } from "typeorm";
import { FavoriteList } from "../entities/FavoriteList";

@EntityRepository(FavoriteList)
class FavoriteListRepository extends Repository<FavoriteList> {}

export default FavoriteListRepository;
