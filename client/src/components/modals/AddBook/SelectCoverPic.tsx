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
import CropModal from "./CropModal";
import Image from "next/image";
interface SelectCoverPicProps {
  setOpenSelectCoverPic: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  preview?: string;
  file: File | null;
  setopenAddBookModal: Dispatch<SetStateAction<boolean>>;
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
const SelectCoverPic: FC<SelectCoverPicProps> = ({
  file,
  setFile,
  setOpenSelectCoverPic,
  setPreview,
  setopenAddBookModal,
  preview,
}) => {
  const [openCrop, setOpenCrop] = useState(false);
  const handleClose = () => {
    setPreview("/images/drag_drop.jpg")
    setOpenSelectCoverPic(false);
  };
  const handleNext = () => {
    if (!file) {
      toast.error("select a file");
      return;
    }
    if (file.type.split("/")[0] !== "image") {
      toast.error("select a valid file");
      return;
    }
    setopenAddBookModal(true);
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
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*, video/*"
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

export default SelectCoverPic;
