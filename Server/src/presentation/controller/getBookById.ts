import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getBookByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getBookByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const bookDetails = await getBookByIdUseCase(dependencies).execute(id);

      if (!bookDetails) {
        throw new Error("Book not found");
      }
      res.status(200).json({
        success: true,
        data: bookDetails,
        message: "Book fetched with id",
      });
    } catch (error) {
      next(error);
    }
  };
};
