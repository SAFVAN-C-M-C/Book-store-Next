export interface IDeleteBookByIdUseCase {
  execute(id: string): Promise<any | null>;
}
