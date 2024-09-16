import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const deleteBookByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { deleteBookByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const postDeleted = await deleteBookByIdUseCase(dependencies).execute(id);

      if (!postDeleted) {
        throw new Error("Book deletion failed");
      }
      res.status(200).json({
        success: true,
        data: postDeleted,
        message: "Book Deleted",
      });
    } catch (error) {
      next(error);
    }
  };
};
