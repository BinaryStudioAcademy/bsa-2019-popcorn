import { Post } from '../models/PostModel';
import PostRepository from '../repository/post.repository';
import { getRepository, getCustomRepository } from "typeorm";

export const createPost = async (post: Post): Promise<Post> => 
    await getCustomRepository(PostRepository)
        .save(post);

    
export const getPosts = async (): Promise<Post[]> =>
    await getCustomRepository(PostRepository)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .getMany()