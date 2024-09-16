import { IBook, ICreateBook } from "@/domain/entities";
import { Books } from "../models";

export const createBook = async (data: ICreateBook) => {
  try {
    const { author, description, isbn, publicationYear, title, cover } = data;
    const newBook = new Books({
      title,
      author,
      publicationYear,
      cover,
      isbn,
      description,
    });
    await newBook.save();
    if (!newBook) {
      throw new Error("some thing went wrong in Creating book");
    }
    return newBook as IBook;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error( `A book with the title "${data.title}" by "${data.author}" already exists.`);
    } else {
      throw new Error(error?.message);
    }
    
  }
};
