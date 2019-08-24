import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Follower } from "../entities/Follower";

@EntityRepository(Follower)
class FollowerRepository extends Repository<Follower> {}

export default FollowerRepository;
