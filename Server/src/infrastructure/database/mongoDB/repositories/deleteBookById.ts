import { IBook, IGetbooks, IGetBooksRes, IUpdateBook } from "@/domain/entities";
import { Books } from "../models";
import { Types } from "mongoose";
import client from "@/infrastructure/elasticsearch";

export const deleteBookById = async (id:string) => {
  try {
    const book = await Books.findByIdAndDelete(new Types.ObjectId(id))
    if (!book) {
      throw new Error("book not found");
    }
    await client.delete({
      index: 'books',
      id: book._id.toString(),
    });
    return book as any;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
