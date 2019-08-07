import { EntityRepository, Repository } from "typeorm";
import { Top } from "../entities/Top";

@EntityRepository(Top)
class TopRepository extends Repository<Top> {
    
}

export default TopRepository;