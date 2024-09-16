import { ObjectId } from "mongoose";

export interface IBook {
  _id: ObjectId;
  title: string;
  author: string;
  cover: string;
  publicationYear: number;
  isbn: string;
  description: string;
}
export interface ICreateBook {
  title: string;
  author: string;
  cover?: string;
  publicationYear: number;
  isbn: string;
  description: string;
}
export interface IUpdateBook {
  id: string;
  title?: string;
  author?: string;
  cover?: string;
  publicationYear?: number;
  isbn?: string;
  description?: string;
}
export interface IGetbooks {
  page: number;
  limit: number;
}
export interface IGetBooksRes {
  totalBooks: number;
  totalPages: number;
  currentPage: number;
  books: IBook[];
}
export interface ElasticsearchHit {
  _id?: string;
  _source: IBook;
}
