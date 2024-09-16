import { ICreateBookUseCase, IDeleteBookByIdUseCase, IGetBookByIdUseCase, IGetBooksUseCase, ISearchBooksUseCase, IUpdateBookByIdUseCase } from "@/domain/useCases";
import { IDependencies } from "./IDependencies";
  
export interface IUseCases {
    createBookUseCase:(dependencies: IDependencies) => ICreateBookUseCase;
    getBooksUseCase:(dependencies: IDependencies) => IGetBooksUseCase;
    getBookByIdUseCase:(dependencies: IDependencies) => IGetBookByIdUseCase;
    updateBookByIdUseCase:(dependencies: IDependencies) => IUpdateBookByIdUseCase;
    searchBooksUseCase:(dependencies: IDependencies)=>ISearchBooksUseCase;
    deleteBookByIdUseCase:(dependencies: IDependencies) => IDeleteBookByIdUseCase;
}
  