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

interface AddBookModalProps {
  books:IBook[] | null | undefined;
  setBooks:Dispatch<SetStateAction<IBook[] | null | undefined>>;
  file: File;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setOpenSelectCoverPic: Dispatch<SetStateAction<boolean>>;
  preview?: string;
  setopenAddBookModal: Dispatch<SetStateAction<boolean>>;
}

const AddBookModal: FC<AddBookModalProps> = ({
  books,
  setBooks,
  file,
  setFile,
  setOpenSelectCoverPic,
  setPreview,
  setopenAddBookModal,
  preview,
}) => {
  const handleClose = () => {
    setPreview("/images/drag_drop.jpg");
    setopenAddBookModal(false);
  };
  const [uploding, setUploading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    if (!file) {
      toast.error("Select an image");
      setUploading(false);
      return;
    }
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
        const res = await axios.post(`${URL}/api/book`, createPostData, config);
        if (res.status === 201) {
          toast.success("Book added");
          setBooks([res.data.data,...(books ?? [])])
          setOpenSelectCoverPic(false);
          setopenAddBookModal(false);
          setFile(null);
          setPreview("/images/drag_drop.jpg");
        } else {
          toast.error("Failed to add Book");
        }
        setUploading(false);
      } else {
        throw new Error("Failed to upload image");
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
            autoFocus
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
            required
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
            autoFocus
            required
            margin="dense"
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
              Create
            </Button>
          ) : (
            "Uploading..."
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBookModal;
