import { EntityRepository, Repository, getRepository } from "typeorm";
import { Discussion } from "../entities/Discussion";

@EntityRepository(Discussion)
class DiscussionRepository extends Repository<Discussion> {
  async getMessages(movieId: string): Promise<Discussion[]> {
    return await getRepository(Discussion)
      .createQueryBuilder("discussion")
      .leftJoin("discussion.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .where("discussion.movieId = :id", { id: movieId })
      .getMany();
  }
}

export default DiscussionRepository;
