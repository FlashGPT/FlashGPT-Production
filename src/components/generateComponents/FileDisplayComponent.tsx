import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
};

function FileDisplayComponent({ uploadedFiles, setUploadedFiles }: Props) {
  return (
    <ul className="border border-grey w-full rounded-md px-4 py-2">
      {uploadedFiles.map((file, index) => (
        <li key={index}>
          {file.name}
          <CloseRoundedIcon
            className="float-right cursor-pointer text-grey bg-grey"
            onClick={() => {
              const newFiles = uploadedFiles.filter((_, i) => i !== index);
              setUploadedFiles(newFiles);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default FileDisplayComponent;
