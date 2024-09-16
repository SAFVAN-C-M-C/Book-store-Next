import { IBook, IGetbooks, IGetBooksRes } from "@/domain/entities";
import { Books } from "../models";
import { Types } from "mongoose";

export const getBookById = async (id:string) => {
  try {

    const book = await Books.findById(new Types.ObjectId(id))
    if (!book) {
      throw new Error("book not found");
    }   
    return book as IBook;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
