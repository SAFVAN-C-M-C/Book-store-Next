import {  IUpdateBook } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateBookByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateBookById },
  } = dependencies;
  return {
    execute: async (data: IUpdateBook) => {
      return await updateBookById(data);
    },
  };
};
