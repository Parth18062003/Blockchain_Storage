import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TbFile } from 'react-icons/tb';

interface FileDetails {
  ipfsHash: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  timestamp: string;
}

interface FilesTableProps {
  files: FileDetails[];
}

const FilesGrid: React.FC<FilesTableProps> = ({ files }) => {
  const unixTimestampToReadable = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })}`;
    return formattedDate;
  };

  const formatFileSize = (fileSize: number): string => {
    if (fileSize < 1024) {
      return fileSize.toFixed(2) + ' B'; // If less than 1 KB, display in bytes
    } else if (fileSize < 1024 * 1024) {
      return (fileSize / 1024).toFixed(2) + ' KB'; // If less than 1 MB, convert to KB
    } else {
      return (fileSize / (1024 * 1024)).toFixed(2) + ' MB'; // Convert to MB
    }
  };

  return (
<div className="mt-4 px-8 flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {files.map((file, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            {file.fileType.startsWith("image/") ? (
              // Display image directly on the website
              <div className="relative h-60">
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
              <div className="bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 flex items-center justify-center h-60">
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
              className="hover:underline p-4"
            >
              View {file.fileType} file
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesGrid;
