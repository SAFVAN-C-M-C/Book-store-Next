/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateField, validateName, validateYear } from "@/util/validation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getSignedUrl } from "@/services/signedUrl";
import { IAddBook, IBook } from "@/domain/entities";
import { config, fetchBooks, URL } from "@/services/bookService";

interface EditbookModalProps {
  book:IBook|null
  setBook:Dispatch<SetStateAction<IBook | null>>;
  file: File | null;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setOpenSelectCoverPic: Dispatch<SetStateAction<boolean>>;
  preview?: string;
  setopenEditBookModal: Dispatch<SetStateAction<boolean>>;
}

const EditbookModal: FC<EditbookModalProps> = ({
  book,
  setBook,
  file,
  setFile,
  setOpenSelectCoverPic,
  setPreview,
  setopenEditBookModal,
  preview,
}) => {
  const [title,setTitle]=useState<string>(book?.title || "")
  const [author,setAuthor]=useState<string>(book?.author || "")
  const [publicationYear,setPublicationYear]=useState<string>(String(book?.publicationYear) || "")
  const [isbn,setIsbn]=useState<string>(book?.isbn || "")
  const [description,setDescription]=useState<string>(book?.description || "")
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    const topic=e.target.name;
    if(topic==="title"){
      setTitle(e.target.value)
    }else if(topic==="author"){
      setAuthor(e.target.value)
    }else if(topic==="publicationYear"){
      setPublicationYear(e.target.value)
    }else if(topic==="isbn"){
      setIsbn(e.target.value)
    }else if(topic==="description"){
      setDescription(e.target.value)
    }
  }
  const handleClose = () => {
    setopenEditBookModal(false);
  };
  const [uploding, setUploading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      if (!validateField(formJson.title)) {
        toast.error("title is required");
        setUploading(false);
        return;
      }
      if (!validateName(formJson.author)) {
        toast.error("author is required");
        setUploading(false);
        return;
      }
      if (!validateYear(formJson.publicationYear)) {
        toast.error("enter valid year");
        setUploading(false);
        return;
      }
      if (!validateField(formJson.isbn)) {
        toast.error("isbn is required");
        setUploading(false);
        return;
      }
      if (!validateField(formJson.description)) {
        toast.error("description is required");
        setUploading(false);
        return;
      }

      if(file){
        const signedUrl: { url: string; media: string } = await getSignedUrl();

        const { url, media } = signedUrl;
        // Ensure the correct Content-Type is used
        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": "image/jpeg",
          },
          withCredentials: true,
        });
        console.log(response);
        
  
        if (response.status === 200) {
          console.log("image uploaded");
          
          // Update profile with the new avatar URL
          const createPostData: IAddBook = {
            cover: `https://s3.ap-south-1.amazonaws.com/projects.safvancmc/${media}`,
            description: formJson.description,
            isbn: formJson.isbn,
            publicationYear: Number(formJson.publicationYear),
            author: formJson.author,
            title: formJson.title,
          };
          const res = await axios.put(`${URL}/api/book/update/${book?._id}`, createPostData, config);
          if (res.status === 200) {
            toast.success("Book updated");
            setBook(res.data.data)
            setOpenSelectCoverPic(false);
            setopenEditBookModal(false);
            setFile(null);
            
          } else {
            toast.error("Failed to update Book");
          }
          setUploading(false);
        } else {
          throw new Error("Failed to upload image");
          setUploading(false);
        }
      }else{
        const createPostData: IAddBook = {
          cover:preview,
          description: formJson.description,
          isbn: formJson.isbn,
          publicationYear: Number(formJson.publicationYear),
          author: formJson.author,
          title: formJson.title,
        };
        const res = await axios.put(`${URL}/api/book/update/${book?._id}`, createPostData, config);
        if (res.status === 200) {
          toast.success("Book updated");
          setBook(res.data.data)
          setOpenSelectCoverPic(false);
          setopenEditBookModal(false);
          setFile(null);
          
        } else {
          toast.error("Failed to update Book");
        }
        setUploading(false);
      }
    } catch (error: any) {
      console.error("There was a problem with the upload:", error);
      toast.error(error.message);
      setUploading(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        open
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle align="center">Create New Post</DialogTitle>
        <DialogContent>
          <div className="w-full h-auto border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
            <Image
              src={String(preview)}
              alt="dragging"
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </div>
          <TextField
          value={title}
          onChange={handleChange}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            placeholder="Enter a Title"
            label="Enter a Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
          onChange={handleChange}
          value={author}
            autoFocus
            required
            margin="dense"
            id="author"
            name="author"
            placeholder="Enter a name of author"
            label="Author"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
          value={publicationYear}
            autoFocus
            onChange={handleChange}
            required
            margin="dense"
            id="publicationYear"
            name="publicationYear"
            placeholder="Enter the year of publication"
            label="Year of publication"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
          value={isbn}
            required
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="isbn"
            name="isbn"
            placeholder="Enter the isbn"
            label="isbn"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
          value={description}
            autoFocus
            required
            margin="dense"
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Enter a good description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!uploding ? (
            <Button
              type="submit"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Update
            </Button>
          ) : (
            "Uploading..."
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditbookModal;
