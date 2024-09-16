import { IBook, IUpdateBook } from "../entities";

export interface ISearchBooksUseCase {
  execute(query:string): Promise<any[] | null>;
}
