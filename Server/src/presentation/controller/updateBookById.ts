import { IDependencies } from "@/application/interfaces/IDependencies";
import { IGetbooks, IUpdateBook } from "@/domain/entities";
import { Request, Response, NextFunction } from "express";

export const updateBookByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { updateBookByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {id}=req.params
      const { author,cover,description,isbn,publicationYear,title} = req.body;
      const data: IUpdateBook = {
        id,
        ...(author && { author: String(author) }),
        ...(cover && { cover: String(cover) }),
        ...(description && { description: String(description) }),
        ...(isbn && { isbn: String(isbn) }),
        ...(publicationYear && { publicationYear: Number(publicationYear) }),
        ...(title && { title: String(title) })
      };
      console.log("data====",data);
      
      const updatedBook = await updateBookByIdUseCase(dependencies).execute(data);

      if (!updatedBook) {
        throw new Error("Book not found");
      }
      res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book updated",
      });
    } catch (error) {
      next(error);
    }
  };
};
