import { IBook, ICreateBook } from "../entities";

export interface ICreateBookUseCase {
  execute(data: ICreateBook): Promise<IBook | null>;
}
