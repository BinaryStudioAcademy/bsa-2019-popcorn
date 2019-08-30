import { EntityRepository, Repository, getRepository } from "typeorm";
import { Post } from "../entities/Post";

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  async getAllPosts(): Promise<Post[]> {
    return await getPost().getMany();
  }
  async getPostsByUserId(userId: string): Promise<Post[]> {
    return await getPost()
      .where("post.userId = :id", { id: userId })
      .getMany();
  }
}

export default PostRepository;

function getPost() {
  return getRepository(Post)
    .createQueryBuilder("post")
    .leftJoinAndSelect("post.comments", "comments")
    .leftJoinAndSelect("post.reactions", "reactions")
    .leftJoin("post.user", "user")
    .addSelect(["user.name", "user.avatar", "user.id"])
    .leftJoin("comments.user", "cuser")
    .addSelect(["cuser.name", "cuser.avatar", "cuser.id"])
    .leftJoin("reactions.user", "ruser")
    .addSelect(["ruser.name", "ruser.avatar", "ruser.id"])
    .orderBy("post.createdAt", "DESC", "NULLS LAST"); //choose sort
}
