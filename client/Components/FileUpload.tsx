"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3YWI1N2QxZC0xMTVhLTQ0MWQtYmIxZi0zNDk1OWI5NDdhZGQiLCJlbWFpbCI6IjIwMjEucGFydGgua2FkYW1AdmVzLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjdjMDVlOWM0YzcxYjM4ZjAwMGY0Iiwic2NvcGVkS2V5U2VjcmV0IjoiYWMxNDliYjUyODI4YjdmYjg0NWJlZGM5ZjEzZWJlODAyNDA3ZGM0NWY4YjA0OWQ2NTNjYjdiMmJjZjdlY2JiYiIsImlhdCI6MTY5NDkzMDE2NH0.y9NzNNfji-NUURYSjplHi3Y1IzWooOUqBW8JZ5iIUyE`;

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log(userId);
  console.log(sessionId);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setUploadedFiles(files);
    }
  };

  const handleSubmission = async () => {
    try {
      // Iterate over each uploaded file
      for (const file of uploadedFiles) {
        // Create a new FormData object for each file
        const formData = new FormData();

        // Append the file to the FormData object
        formData.append("file", file);

        // Create metadata for the file
        const metadata = JSON.stringify({
          name: file.name,
        });

        // Append metadata to the FormData object
        formData.append("pinataMetadata", metadata);

        // Create options for the file
        const options = JSON.stringify({
          cidVersion: 0,
        });

        // Append options to the FormData object
        formData.append("pinataOptions", options);

        // Send a POST request to upload the file
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JWT}`,
            },
          }
        );

        // Log the IPFS hash for the uploaded file
        console.log(`File ${file.name} IPFS hash: ${response.data.IpfsHash}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = (file: File) => {
    if (file.type === "application/pdf") {
      // Open PDF in another tab
      window.open(URL.createObjectURL(file), "_blank");
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Download DOCX file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    // Add handling for other file types if needed
  };

  const handleCancel = (file: File) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((uploadedFile) => uploadedFile !== file)
    );
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center bg-customwhite dark:bg-customblack dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-customblack bg-customwhite [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <label
        htmlFor="file-upload"
        className="relative bg-[#e9e8e8] dark:bg-slate-800 border-2 border-dashed dark:border-gray-300 border-gray-600 rounded-lg p-20 cursor-pointer"
      >
        <input
          id="file-upload"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
          onChange={handleFileChange}
        />
        <span className="block text-center dark:text-gray-400 text-gray-700">
          Drag and drop or select files
        </span>
      </label>
      <button
        onClick={handleSubmission}
        className="mt-3 w-[20rem] relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
          Upload files
        </span>
      </button>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="max-w-sm my-1">
            {file.type.startsWith("image/") ? (
              <>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${file.name} ${index}`}
                  height={200}
                  width={200}
                  className="w-full h-auto"
                />
                <button onClick={() => handleCancel(file)} className="px-8 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-red-400 hover:shadow-xl transition duration-200">
                  Remove File
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handlePreview(file)}
                  className="p-[3px] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    {file.name}
                  </div>
                </button>

                <button onClick={() => handleCancel(file)} className="ml-3 px-3 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-red-400 hover:shadow-xl transition duration-200">
                  Remove File
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;