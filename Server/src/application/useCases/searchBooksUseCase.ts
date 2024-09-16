import {  IUpdateBook } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const searchBooksUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { searchBooks },
  } = dependencies;
  return {
    execute: async (query:string) => {
      return await searchBooks(query);
    },
  };
};
