import { Router } from "express";
import { controllers } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const routes = (dependencies: IDependencies) => {
  const { createBook,deleteBookById,getBookById,getBooks,updateBookById,getSignedUrl} =
    controllers(dependencies);

  const router = Router();
  const route=(path:string)=> router.route(path)
  route('/books').get(getBooks)
  route('/book').post(createBook)
  route('/book/:id').get(getBookById)
  route('/book/update/:id').put(updateBookById)
  route('/book/delete/:id').delete(deleteBookById)
  route('/get/signedUrl').get(getSignedUrl) 

  return router;
};
