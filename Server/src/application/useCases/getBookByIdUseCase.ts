import { IDependencies } from "../interfaces/IDependencies";

export const getBookByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getBookById },
  } = dependencies;
  return {
    execute: async (id: string) => {
      return await getBookById(id);
    },
  };
};
