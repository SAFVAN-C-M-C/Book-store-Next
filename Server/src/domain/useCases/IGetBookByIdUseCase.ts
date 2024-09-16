import { IBook } from "../entities";

export interface IGetBookByIdUseCase {
  execute(id: string): Promise<IBook | null>;
}
