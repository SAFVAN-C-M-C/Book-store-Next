import { IBook, IGetbooks, IGetBooksRes, IUpdateBook } from "@/domain/entities";
import { Books } from "../models";
import { Types } from "mongoose";
import client from "@/infrastructure/elasticsearch";

export const updateBookById = async (data:IUpdateBook) => {
  try {
    const {title,author}=data
    const { id,...updateData } = data;

    // Filter out undefined fields to update only provided fields
    const filteredUpdateData: Partial<IUpdateBook> = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    // Check for uniqueness based on fields being updated
    if (title || author) {
      const existingBook = await Books.findOne({
        _id: { $ne: new Types.ObjectId(id) }, // Exclude the current book
        ...(title && { title: title }), // Check if title is being updated
        ...(author && { author: author }), // Check if author is being updated
      });

      if (existingBook) {
        if (title && existingBook.author === author) {
          throw new Error(`A book with the title "${title}" and author "${author}" already exists.`);
        } else if (author && existingBook.title === title) {
          throw new Error(`A book with the title "${title}" and author "${author}" already exists.`);
        }
      }
    }
console.log(filteredUpdateData);

    // Update the book with the filtered update data
    const book = await Books.findByIdAndUpdate(
      new Types.ObjectId(id),
      filteredUpdateData,
      { new: true } // Return the updated book
    );

    if (!book) {
      throw new Error("Book not found");
    }
    await client.index({
      index: 'books',
      id: book._id.toString(),
      body: data,
    });
    return book as IBook;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
