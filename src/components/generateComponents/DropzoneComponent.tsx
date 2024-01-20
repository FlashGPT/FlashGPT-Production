import React from "react";

type Props = {
  isDragActive: boolean;
  getRootProps: any;
  getInputProps: any;
};

function DropzoneComponent({
  isDragActive,
  getInputProps,
  getRootProps,
}: Props) {
  return (
    <div
      className={`border border-grey p-4 rounded-md w-full justify-center items-center flex`}
    >
      <div
        {...getRootProps()}
        className={`border border-grey border-dashed p-16 rounded-md w-full justify-center items-center flex flex-col ${
          isDragActive ? "bg-grey opacity-50" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <p>(Only .pdf files accepted)</p>
      </div>
    </div>
  );
}

export default DropzoneComponent;
