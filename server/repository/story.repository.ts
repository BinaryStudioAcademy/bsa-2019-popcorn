import { EntityRepository, Repository } from "typeorm";
import { Story } from "../entities/Story";

@EntityRepository(Story)
class StoryRepository extends Repository<Story> {}

export default StoryRepository;
