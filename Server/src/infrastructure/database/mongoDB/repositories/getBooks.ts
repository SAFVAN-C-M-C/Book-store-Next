import { IGetbooks, IGetBooksRes } from "@/domain/entities";
import { Books } from "../models";

export const getBooks = async (data:IGetbooks) => {
  try {
    const {limit,page}=data
    const skip = (page - 1) * limit;
    const books = await Books.find().sort({updatedAt:-1}).skip(skip).limit(limit);
    if (!books) {
      throw new Error("books not found");
    }
    const totalBooks = await Books.countDocuments();
    const returnData:IGetBooksRes={
        books,
        currentPage:page,
        totalBooks,
        totalPages:Math.ceil(totalBooks/limit)
    }
    return returnData;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
