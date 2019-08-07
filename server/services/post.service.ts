import {Post} from '../models/PostModel';
import PostRepository from '../repository/post.repository';
import {getCustomRepository, getRepository} from "typeorm";

export const createPost = async (post: Post): Promise<Post> =>
    await getCustomRepository(PostRepository)
        .save(post);

export const getPosts = async (): Promise<Post[]> =>
    await getRepository(Post)
        .createQueryBuilder("Post")
        .leftJoinAndSelect("Post.userId", "id")
        .getMany();