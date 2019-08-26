import { EntityRepository, Repository, getRepository } from "typeorm";
import { Post } from "../entities/Post";

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async getUserByPost(postId: string): Promise<Post> {
    return await getRepository(Post)
      .createQueryBuilder("post")
      .leftJoin("post.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .where("post.id = :id", { id: postId })
      .getOne();
  }
}

export default PostRepository;
