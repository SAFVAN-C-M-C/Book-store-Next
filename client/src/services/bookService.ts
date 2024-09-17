import { IFetchBookRes } from "@/domain/entities";
import axios, { AxiosRequestConfig } from "axios";
export const URL="http://localhost:4040"
export const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
// Fetch paginated list of books
export const fetchBooks = async (page: number):Promise<IFetchBookRes|null> => {
  const res = await axios.get(`${URL}/api/books?page=${page}`);
  return res.data;
};

// Search books by query
export const searchBooks = async (query: string) => {
  const res = await axios.get(`${URL}/api/search?query=${query}`);
  return res.data.data;
};

// Fetch a single book by ID
export const fetchBookById = async (id: string) => {
  const res = await axios.get(`${URL}/api/book/${id}`);
  return res.data.data;
};
