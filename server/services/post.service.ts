import { Post } from "../models/PostModel";
import PostRepository from "../repository/post.repository";
import SurveyRepository from "../repository/surveys.repository";
import TopRepository from "../repository/top.repository";
import EventRepository from "../repository/event.repository";
import UserRepository from "../repository/user.repository";
import { getCustomRepository, Like, FindManyOptions } from "typeorm";
import PostCommentsRepository from "../repository/postComments.repository";
import { PostCommentsModel } from "../models/PostCommentsModel";
import { PostReactions } from "../models/PostReactionsModel";
import PostReactionsRepository from "../repository/postReactions.repository";
import * as topService from "../services/top.service";
import * as uuid from "uuid/v4";

const getExtra = async (post: any) => {
  if (!post.extraType) {
    return post;
  }
  switch (post.extraType) {
    case "survey":
      post.survey = await getCustomRepository(SurveyRepository).findOne(
        post.extraData.id
      );
      break;
    case "top":
      post.top = await getCustomRepository(TopRepository).findOne(
        post.extraData.id
      );
      break;
    case "event":
      post.event = await getCustomRepository(EventRepository).findOne(
        post.extraData.id
      );
      break;
  }
  delete post.extraData;
  delete post.extraType;
  return post;
};

const getMovieInTop = async (topId: string) => {
  const top = await topService.getTopById(topId);
  return top.movieInTop;
};

export const createPost = async (post: any): Promise<Post> => {
  post = await getExtra(post);
  post.createdAt = new Date();
  await getCustomRepository(PostRepository).save(post);

  const createdPost: any = await getCustomRepository(PostRepository).findOne({
    where: { id: post.id },
    relations: ["user", "top", "survey", "event"]
  });
  if (createdPost.top) {
    createdPost.top.movieInTop = await getMovieInTop(post.top.id);
  }

  return createdPost;
};

export const getPosts = async (
  movieId: string = null,
  userId: string = null
): Promise<any[]> => {
  const options: FindManyOptions = {
    relations: ["user", "top", "survey", "event"],
    where: {},
    order: { createdAt: "DESC" }
  };
  if (movieId) {
    options.where = { description: Like(`%@${movieId}{%`) };
  }
  if (userId) {
    options.where = { user: { id: userId } };
  }

  const posts = await getCustomRepository(PostRepository).find(options);

  return await Promise.all(
    posts.map(async post => {
      const allPost: any = { ...post };

      if (allPost.top) {
        allPost.top.movieInTop = await getMovieInTop(post.top.id);
      }
      allPost.comments = (await getComments(post)).reverse();
      allPost.reactions = await getReactions(post);

      return allPost;
    })
  );
};

export const deletePostById = async (postId: string): Promise<any> => {
  return await getCustomRepository(PostRepository).delete({ id: postId });
};

export const updateById = async (post: any): Promise<any> => {
  await getCustomRepository(PostRepository).update(
    { id: post.id },
    { ...post }
  );

  const updatedPost: any = await getCustomRepository(PostRepository).findOne({
    where: { id: post.id },
    relations: ["user", "top", "survey", "event"]
  });
  if (updatedPost.top) {
    updatedPost.top.movieInTop = await getMovieInTop(updatedPost.top.id);
  }
  updatedPost.comments = await getComments(updatedPost);
  updatedPost.reactions = await getReactions(updatedPost);

  return updatedPost;
};
export const getPostById = async (postId: string): Promise<Post> =>
  await getCustomRepository(PostRepository).findOne({
    where: { id: postId },
    relations: ["user", "top", "survey", "event"]
  });

export const getPostsByUserId = async (userId: string): Promise<Post[]> =>
  await getCustomRepository(PostRepository).find({
    relations: ["user", "top", "survey", "event"],
    where: { user: { id: userId } },
    order: { createdAt: "DESC" }
  });

export const createComment = async ({ userId, postId, text }) => {
  const user = await getCustomRepository(UserRepository).findOne({
    id: userId
  });
  const post = await getCustomRepository(PostRepository).findOne({
    id: postId
  });
  if (!user || !post) {
    throw new Error("Not Found");
  }
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
  if (!user || !post) {
    throw new Error("Not Found");
  }
  const postReactionRepository = await getCustomRepository(
    PostReactionsRepository
  );
  if (!(await postReactionRepository.findOne({ user, post, type }))) {
    await getCustomRepository(PostReactionsRepository).save({
      id: uuid(),
      user,
      post,
      type
    });
  } else {
    await postReactionRepository.delete({ user, post, type });
  }
  return { postId, reactions: await getReactions(post) };
};

export const getComments = async (post: Post): Promise<PostCommentsModel[]> =>
  await getCustomRepository(PostCommentsRepository).find({
    where: { post },
    relations: ["user"]
  });

export const getReactions = async (post: Post): Promise<PostReactions[]> =>
  await getCustomRepository(PostReactionsRepository)
    .createQueryBuilder("post_reactions")
    .select("post_reactions.type AS type")
    .addSelect("COUNT(*) AS count")
    .groupBy("post_reactions.type")
    .where({ post })
    .getRawMany();
