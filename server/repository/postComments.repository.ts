import { EntityRepository, Repository } from "typeorm";
import { PostComments } from "../entities/PostComments";

@EntityRepository(PostComments)
class PostCommentsRepository extends Repository<PostComments> {}

export default PostCommentsRepository;
