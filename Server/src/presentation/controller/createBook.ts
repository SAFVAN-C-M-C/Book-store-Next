import { IDependencies } from "@/application/interfaces/IDependencies";
import { ICreateBook } from "@/domain/entities";
import { Request, Response, NextFunction } from "express";

export const createBookController = (dependencies: IDependencies) => {
  const {
    useCases: { createBookUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        author,
        description,
        isbn,
        publicationYear,
        title,
        cover,
      }: ICreateBook = req.body;
      const data = { author, description, isbn, publicationYear, title, cover };
      const createdBook = await createBookUseCase(dependencies).execute(data);

      if (!createdBook) {
        throw new Error("Book creation failed");
      }
      res.status(201).json({
        success: true,
        data: createdBook,
        message: "Book Created",
      });
    } catch (error:any) {
    if (error.code === 11000) {
        next({message: `A book with the title "${req.body.title}" by "${req.body.author}" already exists.`});
      } else {
        next(error);
      }
      
    }
  };
};
