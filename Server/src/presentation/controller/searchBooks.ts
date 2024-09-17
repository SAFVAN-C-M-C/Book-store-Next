import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const searchBooksController = (dependencies: IDependencies) => {
  const {
    useCases: { searchBooksUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {query}=req.query
      const books = await searchBooksUseCase(dependencies).execute(String(query));

      if (!books) {
        throw new Error("Books not found");
      }
      console.log("query==",query);
      console.log("data==",books);
      
      
      res.status(200).json({
        success: true,
        data: books,
        message: "Book fetched",
      });
    } catch (error) {
      next(error);
    }
  };
};
