"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { TbFolderCancel } from "react-icons/tb";
import { IoMdCloudUpload } from "react-icons/io";
import { Loader } from "./Loader";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);

      // Check if any files are selected
      if (files.length === 0) {
        setErrorMessage("Please select at least one file.");
        return;
      }

      // Check if more than 5 files are selected
      if (files.length > 5) {
        setErrorMessage("Maximum 5 files allowed.");
        const limitedFiles = files.slice(0, 5);
        setUploadedFiles(limitedFiles);
        return;
      }

      // Check file sizes
      const oversizedFiles = files.filter(
        (file) => file.size > 10 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        const oversizedFileNames = oversizedFiles
          .map((file) => file.name)
          .join(", ");
        setErrorMessage(
          `The following file(s) exceed the 10MB size limit: ${oversizedFileNames}`
        );
        return;
      }

      // Limit the number of files to 5
      const limitedFiles = files.slice(0, 5);

      setUploadedFiles(limitedFiles);
      const getFileType = (fileName: string) => {
        const extensionMatch = fileName.match(/\.([^.]+)$/);
        if (extensionMatch && extensionMatch[1]) {
          const extension = extensionMatch[1].toLowerCase();
          const fileTypeMap: { [key: string]: string } = {
            pdf: "PDF",
            docx: "DOCX",
            ppt: "PPT",
            py: "Python",
            exe: "Executable",
            // Add more mappings for other file types as needed
          };
          return fileTypeMap[extension] || extension.toUpperCase();
        }
        return "File";
      };

      // Iterate over each file and get its type
      limitedFiles.forEach((file) => {
        console.log(getFileType(file.name));
      });
      setErrorMessage(""); // Clear error message if no error
    }
  };

  const handleSubmission = async () => {
    try {
      if (uploadedFiles.length === 0) {
        setErrorMessage("Please select at least one file.");
        return;
      }
      setLoading(true);
      // Iterate over each uploaded file
      for (const file of uploadedFiles) {
        // Create a new FormData object for each file
        const formData = new FormData();

        // Append the file to the FormData object
        formData.append("file", file);

        const filemetadata = {
          userId: userId,
          name: file.name,
          size: file.size,
          type: file.type,
        };

        formData.append("filemetadata", JSON.stringify(filemetadata));
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

        await axios.post("http://localhost:4321/upload", {
          ipfsHash: response.data.IpfsHash,
          filemetadata: filemetadata,
        });
        //console.log("meta", filemetadata);
        // Log the IPFS hash for the uploaded file
        //console.log(`File ${file.name} IPFS hash: ${response.data.IpfsHash}`);
        console.log("response", response);
        setUploadedFiles([]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
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
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
    <div className="h-[100vh] flex flex-col justify-center items-center bg-customwhite dark:bg-customblack dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-customblack bg-customwhite [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <label
        htmlFor="file-upload"
        className="relative bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 border-2 border-dashed dark:border-gray-300 border-gray-600 rounded-lg p-20 cursor-pointer flex flex-col items-center justify-center"
      >
        <input
          id="file-upload"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
          onChange={handleFileChange}
        />
        <IoMdCloudUpload className="text-6xl text-gray-600 dark:text-gray-400" />
        <span className="block text-center text-xl dark:text-gray-400 text-gray-700">
          Drag and drop or select files
        </span>
        <span className="block text-center text-base dark:text-gray-600 text-gray-400 mt-4">
          Select maximum 5 files of not more than 10mb each
        </span>
      </label>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {loading ? (
        <div className="mt-3">
          <Loader />
        </div>
      ) : (
        <>
          <button
            onClick={handleSubmission}
            className="mt-3 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
              Upload files
            </span>
          </button>
          {uploadedFiles && uploadedFiles.length > 0 ? (
            <>
              <div className="mt-4 z-0 overflow-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Preview</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map((file, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                          {file.type.startsWith("image/") ? (
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${file.name} ${index}`}
                              height={300}
                              width={300}
                              className="h-full w-[15rem]"
                            />
                          ) : (
                            <div className="p-[3px] relative">
                              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg h-10 w-10" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 max-w-[9rem] sm:max-w-[15rem] truncate">
                          {file.name}
                        </td>
                        <td className="px-4 py-2">
                          {file.type.startsWith("image/") ? (
                            <></>
                          ) : (
                            <>
                              <button
                                onClick={() => handlePreview(file)}
                                className="p-[3px] relative"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                  preview
                                </div>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleCancel(file)}
                            className="ml-3 mt-4 px-3 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white text-xl focus:ring-2 focus:ring-red-400 hover:shadow-xl transition duration-200"
                          >
                            <TbFolderCancel />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default FileUpload;
