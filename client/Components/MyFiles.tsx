"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuth } from "@clerk/nextjs";
import abi from "../../ContractAbi.json";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "./Loader";
import { TbFile } from "react-icons/tb";

// Define the contract address and ABI
const contractAddress = "0xc9396D8F8f9659ABcC014d951a715A00Ee13955E";

interface FileDetails {
  ipfsHash: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  timestamp: string;
}

const MyFiles = () => {
  const [files, setFiles] = useState<FileDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { userId } = useAuth();
  useEffect(() => {
    // Check if userId is available before fetching files
    if (userId) {
      const fetchFiles = async () => {
        try {
          const provider = new ethers.providers.JsonRpcProvider(
            "https://sepolia.infura.io/v3/8c8cdae365e94b56a67fad79c126cc7e"
          );
          const contract = new ethers.Contract(contractAddress, abi, provider);

          // Fetching details of all files associated with the current user ID
          const [fileDetails, ipfsHashes]: [FileDetails[], string[]] =
            await contract.getFileByUserId(userId);

          console.log("Files:", fileDetails);
          console.log("IPFS Hashes:", ipfsHashes);

          // Combine file details with IPFS hashes
          const filesWithHashes = fileDetails.map((file, index) => ({
            ...file,
            ipfsHash: ipfsHashes[index],
          }));

          setFiles(filesWithHashes);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching files:", error);
          setLoading(false);
        }
      };

      fetchFiles();
    }
  }, []); // Empty dependency array ensures the effect runs only once

  const unixTimestampToReadable = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}`;
    return formattedDate;
  };

  const formatFileSize = (fileSize: number): string => {
    if (fileSize < 1024) {
      return fileSize.toFixed(2) + " B"; // If less than 1 KB, display in bytes
    } else if (fileSize < 1024 * 1024) {
      return (fileSize / 1024).toFixed(2) + " KB"; // If less than 1 MB, convert to KB
    } else {
      return (fileSize / (1024 * 1024)).toFixed(2) + " MB"; // Convert to MB
    }
  };

  return (
    <div className="bg-customwhite dark:bg-customblack">
      <div className="flex flex-col px-8">
        <div>
          <button
            className={`mr-4 px-4 py-2 rounded-md my-8 ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              viewMode === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
        </div>
        <h2 className="text-xl font-semibold">My Files</h2>
      </div>
      {loading ? (
        <Loader />
      ) : viewMode === "grid" ? (
        <div className="mt-4 px-8 h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {files.map((file, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                {file.fileType.startsWith("image/") ? (
                  // Display image directly on the website
                  <div className="relative h-40">
                    <Image
                      src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                      alt={file.fileName}
                      height={200}
                      width={200}
                      className="object-cover w-full h-full"
                      priority={true}
                    />
                  </div>
                ) : (
                  // Display placeholder icon for other file types
                  <div className="bg-gray-200 text-gray-600 flex items-center justify-center h-40">
                    <TbFile className="h-24 w-24" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{file.fileName}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    File Type: {file.fileType}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Timestamp:{" "}
                    {unixTimestampToReadable(parseInt(file.timestamp))}
                  </p>
                  <p className="text-sm text-gray-500">
                    File Size: {formatFileSize(parseInt(file.fileSize))}
                  </p>
                </div>
                <Link
                  href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline p-4"
                >
                  View {file.fileType} file
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 h-screen">
          <table className="w-full table-auto ">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  File Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  File Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-950  ">
              {files.map((file, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    {file.fileType.startsWith("image/") ? (
                      <Image
                        src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                        alt={file.fileName}
                        height={200}
                        width={200}
                        className="object-cover w-full h-full"
                        priority={true}
                      />
                    ) : (
                      <div className="p-[3px] relative">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg h-10 w-10" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {file.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {file.fileType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {unixTimestampToReadable(parseInt(file.timestamp))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatFileSize(parseInt(file.fileSize))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {file.fileType.startsWith("image/") ? (
                      // Display image directly on the website
                      <Link
                        href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    ) : (
                      // Display link for other file types
                      <Link
                        href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFiles;
