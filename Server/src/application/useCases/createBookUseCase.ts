import { ICreateBook } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createBookUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createBook },
  } = dependencies;
  return {
    execute: async (data: ICreateBook) => {
      return await createBook(data);
    },
  };
};
