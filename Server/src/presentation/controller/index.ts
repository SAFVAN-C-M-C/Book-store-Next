import { IDependencies } from "@/application/interfaces/IDependencies"
import { createBookController } from "./createBook"
import { deleteBookByIdController } from "./deleteBookById"
import { getBookByIdController } from "./getBookById"
import { getBooksController } from "./getBooks"
import { updateBookByIdController } from "./updateBookById"
import { getSignedUrlController } from "./getSignedUrl"


export const controllers = (dependencies: IDependencies) => {
    return{
        createBook:createBookController(dependencies),
        deleteBookById:deleteBookByIdController(dependencies),
        getBookById:getBookByIdController(dependencies),
        getBooks:getBooksController(dependencies),
        updateBookById:updateBookByIdController(dependencies),
        getSignedUrl:getSignedUrlController(dependencies)
    }
}