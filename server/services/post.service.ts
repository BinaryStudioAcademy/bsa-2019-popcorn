import {Post} from '../models/PostModel';
import PostRepository from '../repository/post.repository';
import {getRepository, getCustomRepository, AdvancedConsoleLogger} from "typeorm";

export const createPost = async (post: any): Promise<Post> =>
    await getRepository(PostRepository)
        .save(post);

export const getPosts = async (): Promise<Post[]> => {
    return await getRepository(Post)
        .createQueryBuilder("Post")
        .leftJoinAndSelect("Post.userId", "id")
        .getMany();
}
