import { IDependencies } from "../interfaces/IDependencies";

export const deleteBookByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { deleteBookById },
  } = dependencies;
  return {
    execute: async (id: string) => {
      return await deleteBookById(id);
    },
  };
};
