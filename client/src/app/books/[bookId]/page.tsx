/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client";
import EditbookModal from "@/components/modals/EditBook/EditbookModal";
import EditCoverPic from "@/components/modals/EditBook/EditCoverPic";
import { IBook } from "@/domain/entities";
import { useRouter } from "next/navigation";
import { config, fetchBookById, URL } from "@/services/bookService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface BookDetailProps {
  params: {
    bookId: string;
  };
}

const BookDetailPage = ({ params }: BookDetailProps) => {
  const router = useRouter();
  const { bookId } = params;
  const [book,setBook]=useState<IBook|null>(null);
  const [openSelectCoverPic, setOpenSelectCoverPic] = useState<boolean>(false);
  const [openEditBookModal, setopenEditBookModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | undefined>("/images/drag_drop.jpg");
  const [file, setFile] = useState<File | null>(null);
  const getBook=async(bookId:string)=>{
    const book: IBook = await fetchBookById(bookId);
    setBook(book);
  }
  useEffect(()=>{
    if(!book && bookId){
      getBook(bookId)
    }
  },[book, bookId])
  useEffect(()=>{
    if(book){
      setPreview(book.cover)
    }
  },[book])
  const handleEdit=()=>{
    setOpenSelectCoverPic(true)
  }
  const handleDelte=async()=>{
    try {
      const res = await axios.delete(`${URL}/api/book/delete/${book?._id}`, config);
      if(res.status===200){
        router.replace('/');
        toast.success("Book deleted successfully")
      }
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
  return (
    <>
        {
        openSelectCoverPic?<EditCoverPic file={file} setFile={setFile} setOpenSelectCoverPic={setOpenSelectCoverPic} setPreview={setPreview} setopenEditBookModal={setopenEditBookModal} preview={preview}/>:null
    }
    {
        openEditBookModal && (file || preview!=="/images/drag_drop.jpg") ?<EditbookModal book={book} file={file}  setBook={setBook} setFile={setFile} setOpenSelectCoverPic={setOpenSelectCoverPic} setPreview={setPreview} setopenEditBookModal={setopenEditBookModal} preview={preview}/>:null
    }
      {
        book?<div className="book-container flex flex-col sm:flex-row f-full  m-10 gap-3">
        <div className="cover w-full sm:w-1/2 flex justify-center ">
          <img src={book.cover} alt={book.title} className="w-full"/>
        </div>
        <div className="details w-full sm:w-1/2">
          <div className="actions w-full flex justify-end gap-3">
            <EditIcon className="cursor-pointer" onClick={handleEdit}/>
            <DeleteIcon className="cursor-pointer" onClick={handleDelte}/>
          </div>
          <h1 className="font-bold text-2xl">{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Published in: {book.publicationYear}</p>
          <p>ISBN: {book.isbn}</p>
          <p>{book.description}</p>
        </div>
      </div>:(<div className="w-full h-[100vh] flex justify-center items-center"><span>404 Book not found</span></div>)
      }
    </>
  );
};

export default BookDetailPage;
