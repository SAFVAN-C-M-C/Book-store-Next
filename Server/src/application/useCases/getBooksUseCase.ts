import { IGetbooks } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getBooksUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getBooks },
  } = dependencies;
  return {
    execute: async (data:IGetbooks) => {
      return await getBooks(data);
    },
  };
};
