export interface IBook {
    _id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
    description: string;
    cover?: string;
}
export interface IFetchBookRes{
  success: boolean,
  data: IFetchBookResData,
  message: string,
}
interface IFetchBookResData{
  totalBooks:number,
  totalPages:number,
  currentPage: number,
  books:IBook[]
}
export interface IAddBook{
  title: string;
  author: string;
  publicationYear: number;
  isbn: string;
  description: string;
  cover?: string;
}