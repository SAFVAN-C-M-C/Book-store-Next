import { IGetbooks, IGetBooksRes } from "../entities";

export interface IGetBooksUseCase {
  execute(data:IGetbooks): Promise<IGetBooksRes| null>;
}
