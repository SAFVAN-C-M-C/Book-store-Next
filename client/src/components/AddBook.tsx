import React, { Dispatch, FC, SetStateAction, useState } from "react";
import SelectCoverPic from "./modals/AddBook/SelectCoverPic";
import AddBookModal from "./modals/AddBook/AddBookModal";
import { IBook } from "@/domain/entities";

interface AddBookProps{
    books:IBook[] | null | undefined;
    setBooks:Dispatch<SetStateAction<IBook[] | null | undefined>>;
}
const AddBook:FC<AddBookProps> = ({books,setBooks}) => {
  const [openSelectCoverPic, setOpenSelectCoverPic] = useState<boolean>(false);
  const [openAddBookModal, setopenAddBookModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | undefined>("/images/drag_drop.jpg");
  const [file, setFile] = useState<File | null>(null);
  const handleAddBookClick = () => {
    setOpenSelectCoverPic(true);
    return;
  };
  return (
    <>
    {
        openSelectCoverPic?<SelectCoverPic file={file} setFile={setFile} setOpenSelectCoverPic={setOpenSelectCoverPic} setPreview={setPreview} setopenAddBookModal={setopenAddBookModal} preview={preview}/>:null
    }
    {
        openAddBookModal && file?<AddBookModal file={file} books={books} setBooks={setBooks} setFile={setFile} setOpenSelectCoverPic={setOpenSelectCoverPic} setPreview={setPreview} setopenAddBookModal={setopenAddBookModal} preview={preview}/>:null
    }
      <span
        onClick={handleAddBookClick}
        className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-800 cursor-pointer"
      >
        Add Book
      </span>
    </>
  );
};

export default AddBook;
