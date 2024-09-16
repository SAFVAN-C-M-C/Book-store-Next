import { IDependencies } from "@/application/interfaces/IDependencies";
import { IGetbooks } from "@/domain/entities";
import { Request, Response, NextFunction } from "express";

export const getBooksController = (dependencies: IDependencies) => {
  const {
    useCases: { getBooksUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const data: IGetbooks = {
        limit: Number(limit),
        page: Number(page),
      };
      const books = await getBooksUseCase(dependencies).execute(data);

      if (!books) {
        throw new Error("Books not found");
      }
      res.status(200).json({
        success: true,
        data: books,
        message: "Books fetched",
      });
    } catch (error) {
      next(error);
    }
  };
};
