import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { UserTemp } from "../entities/UserTemp";

@EntityRepository(UserTemp)
class UserTempRepository extends Repository<UserTemp> {}

export default UserTempRepository;
