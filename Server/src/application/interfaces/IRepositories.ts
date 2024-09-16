import { IBook, ICreateBook, IGetbooks, IGetBooksRes, IUpdateBook } from "@/domain/entities";

export interface IRepositories {
    createBook:(data:ICreateBook)=>Promise<IBook|null>;
    getBooks:(data:IGetbooks)=>Promise<IGetBooksRes|null>;
    getBookById:(id:string)=>Promise<IBook|null>;
    updateBookById:(data:IUpdateBook)=>Promise<IBook|null>;
    searchBooks:(query:string)=>Promise<any[]|null>
    deleteBookById:(id:string)=>Promise<any|null>;
}
