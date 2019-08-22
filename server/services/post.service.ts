import { Post } from "../models/PostModel";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import { getCustomRepository } from "typeorm";
import PostCommentsRepository from "../repository/postComments.repository";
import { PostCommentsModel } from "../models/PostCommentsModel";
import { PostReactions } from "../models/PostReactionsModel";
import PostReactionsRepository from "../repository/postReactions.repository";
const uuid = require("uuid/v4");

export const createPost = async (post: any): Promise<Post> => {
  post.user = await getCustomRepository(UserRepository).findOne(post.userId);
  delete post.userId;
  return await getCustomRepository(PostRepository).save(post);
};

export const getPosts = async (): Promise<any[]> => {
  const posts = await getCustomRepository(PostRepository).find({
    relations: ["user"]
  });
  return Promise.all(
    posts.map(async post => {
      const Post: any = { ...post };
      Post.comments = await getComments(post);
      Post.reactions = await getReactions(post);
      return Post;
    })
  );
};

export const deletePostById = async (postId: string): Promise<Post> => {
  const post = await getCustomRepository(PostRepository).findOne({
    id: postId
  });
  return await getCustomRepository(PostRepository).remove(post);
};

export const getPostById = async (postId: string): Promise<Post> =>
  await getCustomRepository(PostRepository).findOne({ id: postId });

export const getPostsByUserId = async (userId: string): Promise<Post[]> =>
  await getCustomRepository(PostRepository).find({
    relations: ["user"],
    where: { user: { id: userId } }
  });
export const createComment = async ({ userId, postId, text }) => {
  const user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  const post = await getCustomRepository(PostRepository).findOne({
    id: postId
  });
  if (!user || !post) throw new Error("Not Found");
  return getCustomRepository(PostCommentsRepository).save({
    id: uuid(),
    user,
    post,
    text
  });
};

export const createReaction = async ({ userId, postId, type }) => {
  const user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  const post = await getCustomRepository(PostRepository).findOne({
    id: postId
  });
  if (!user || !post) throw new Error("Not Found");
  return getCustomRepository(PostReactionsRepository).save({
    id: uuid(),
    user,
    post,
    type
  });
};

export const getComments = async (post: Post): Promise<PostCommentsModel[]> =>
  await getCustomRepository(PostCommentsRepository).find({
    where: { post },
    relations: ["user"]
  });

export const getReactions = async (post: Post): Promise<PostReactions[]> =>
  await getCustomRepository(PostReactionsRepository).find({
    where: { post }
  });
