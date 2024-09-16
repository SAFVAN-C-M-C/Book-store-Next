import { IBook, IUpdateBook } from "../entities";

export interface IUpdateBookByIdUseCase {
  execute(data: IUpdateBook): Promise<IBook | null>;
}
