import { Top } from "../models/TopModel";
import TopRepository from "../repository/top.repository";
import { getCustomRepository } from "typeorm";

export const getTops = async (): Promise<Top[]> =>
  await getCustomRepository(TopRepository).find();

export const getTopById = async (topId: number): Promise<Top> =>
  await getCustomRepository(TopRepository).findOne(topId);

export const createTop = async (top: Top): Promise<Top> =>
  await getCustomRepository(TopRepository).save(top);

export const updateTop = async (updatedTop: Top): Promise<Top> => {
  let top: Top = await getCustomRepository(TopRepository).findOne(
    updatedTop.id
  );
  top = updatedTop;
  return await getCustomRepository(TopRepository).save(top);
};

export const deleteTopById = async (topId: number): Promise<Top> => {
  const top = await getCustomRepository(TopRepository).findOne(topId);
  return await getCustomRepository(TopRepository).remove(top);
};
