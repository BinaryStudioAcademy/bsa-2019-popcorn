import { EntityRepository, Repository } from "typeorm";
import { PostReactions } from "../entities/PostReactions";

@EntityRepository(PostReactions)
class PostReactionsRepository extends Repository<PostReactions> {}

export default PostReactionsRepository;
