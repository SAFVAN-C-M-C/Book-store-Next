/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  DialogTitle,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CropModal from "../AddBook/CropModal";
import Image from "next/image";
interface EditCoverPicProps {
  setOpenSelectCoverPic: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  preview?: string;
  file: File | null;
  setopenEditBookModal: Dispatch<SetStateAction<boolean>>;
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const EditCoverPic: FC<EditCoverPicProps> = ({
  file,
  setFile,
  setOpenSelectCoverPic,
  setPreview,
  setopenEditBookModal,
  preview,
}) => {
  const [openCrop, setOpenCrop] = useState(false);
  const handleClose = () => {
    setOpenSelectCoverPic(false);
  };
  const handleNext = () => {
    if (!file && !preview) {
      toast.error("select a file");
      return;
    }
    if (file && file.type.split("/")[0] !== "image") {
      toast.error("select a valid file");
      return;
    }
    setopenEditBookModal(true);
  };
  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      if (file.type.split("/")[0] === "image") {
        setOpenCrop(true);
      }
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      if (file.type.split("/")[0] === "image") {
        setOpenCrop(true);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {openCrop ? (
        <CropModal
          preview={preview}
          setPreview={setPreview}
          setFile={setFile}
          setOpenCrop={setOpenCrop}
        />
      ) : (
        <>
          <Dialog fullWidth={true} open onClose={handleClose}>
            <DialogTitle align="center">Select a file</DialogTitle>
            <DialogContent>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                {isDragActive ? (
                  <>
                    <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex justify-center">
                      <p>Ok now drop here 😀...</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-auto border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
                      <Image
                        src={String(preview)}
                        alt="dragging"
                        width={300}
                        height={300}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full flex justify-center">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Change Cover Pic
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleNext}>Next</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default EditCoverPic;
