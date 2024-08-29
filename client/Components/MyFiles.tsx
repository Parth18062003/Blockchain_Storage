"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAuth } from "@clerk/nextjs";
import abi from "../../ContractAbi.json";
import { Loader } from "./Loader";
import { TbFilterDown, TbLayoutGrid, TbTable } from "react-icons/tb";
import FilesTable from "./Table";
import FilesGrid from "./Grid";
import placeholder from "../public/Assets/placeholder.svg";
import Image from "next/image";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filteredFiles, setFilteredFiles] = useState<FileDetails[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"size" | "timestamp">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const { userId } = useAuth();
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/8c8cdae365e94b56a67fad79c126cc7e"
      );
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const [fileDetails, ipfsHashes]: [FileDetails[], string[]] =
        await contract.getFileByUserId(userId);

      const filesWithHashes = fileDetails.map((file, index) => ({
        ...file,
        ipfsHash: ipfsHashes[index],
      }));

      setFiles(filesWithHashes);
      setFilteredFiles(filesWithHashes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchFiles();
    }
  }, [userId]);

  useEffect(() => {
    let updatedFiles = [...files];

    if (filter.trim() !== "") {
      updatedFiles = updatedFiles.filter((file) =>
        file.fileName.toLowerCase().includes(filter.toLowerCase())
      );
    }

    updatedFiles.sort((a, b) => {
      if (sortBy === "size") {
        const sizeA = parseInt(a.fileSize);
        const sizeB = parseInt(b.fileSize);
        return sortOrder === "asc" ? sizeA - sizeB : sizeB - sizeA;
      } else {
        const timestampA = parseInt(a.timestamp);
        const timestampB = parseInt(b.timestamp);
        return sortOrder === "asc"
          ? timestampA - timestampB
          : timestampB - timestampA;
      }
    });

    setFilteredFiles(updatedFiles);
  }, [filter, files, sortBy, sortOrder]);

  const toggleSortOrder = (value: string) => {
    setSortOrder(value as "asc" | "desc");
  };
  const handleSortBy = (value: string) => {
    setSortBy(value as "size" | "timestamp");
  };

  const toggleSortOptions = () => {
    setShowSortOptions((prev) => !prev);
  };
  return (
    <div className="bg-customwhite dark:bg-customblack min-h-screen translate-y-10">
      <div className="flex flex-col px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="mb-2 sm:mb-0">
            <button
              onClick={() => setViewMode("grid")}
              className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              <TbLayoutGrid className="inline -ml-1 mr-2 text-xl" /> Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 ml-3"
            >
              <TbTable className="inline -ml-1 mr-2 text-xl" />
              Table
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by file name..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 w-[15rem]"
            />
            <button
              onClick={toggleSortOptions}
              className="mx-2 px-4 py-2 rounded-xl border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
            >
              <TbFilterDown className="inline -ml-1 mr-2 text-xl" /> Filter
            </button>
            {showSortOptions && (
              <ul className="absolute top-[9rem] right-8 z-10 bg-white dark:bg-black border border-gray-200 rounded-lg shadow-md w-44">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleSortBy("size");
                    toggleSortOrder("asc");
                  }}
                >
                  By Size Asc
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleSortBy("size");
                    toggleSortOrder("desc");
                  }}
                >
                  By Size Dec
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleSortBy("timestamp");
                    toggleSortOrder("asc");
                  }}
                >
                  By Time Asc
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleSortBy("timestamp");
                    toggleSortOrder("desc");
                  }}
                >
                  By Time Desc
                </li>
              </ul>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-semibold">My Files</h2>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : files.length === 0 ? (
        <div className="flex flex-col justify-center items-center translate-y-20">
          <Image src={placeholder} alt="No files" className="h-64 w-64" />
          <h3 className="px-4 mt-3">
            You have no files uploaded.{" "}
            <Link href="/upload" className="underline">
              Upload some files to view them
            </Link>
          </h3>
        </div>
      ) : viewMode === "grid" ? (
        <FilesGrid files={filteredFiles} />
      ) : (
        <FilesTable files={filteredFiles} />
      )}
    </div>
  );
};

export default MyFiles;
