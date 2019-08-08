import { Post } from '../models/PostModel';
import PostRepository from '../repository/post.repository';
import UserRepository from '../repository/user.repository'
import { getRepository, getCustomRepository } from "typeorm";

export const createPost = async (post: any): Promise<Post> => {

    post.user = await getCustomRepository(UserRepository).findOne(post.userId);
    delete post.userId;
    console.log(post);
    return await getCustomRepository(PostRepository)
        .save(post);
}

export const getPosts = async (): Promise<Post[]> =>
    await getCustomRepository(PostRepository)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .getMany()

export const deletePostById = async (postId: number): Promise<Post> => {
    const post = await getCustomRepository(PostRepository).findOne(postId);
    return await getCustomRepository(PostRepository).remove(post);
}