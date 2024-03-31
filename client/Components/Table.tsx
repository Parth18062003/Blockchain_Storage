import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

const FilesTable: React.FC<FilesTableProps> = ({ files }) => {
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
    <div className="mt-8 h-screen overflow-auto">
      <table className="w-full table-auto divide-y divide-solid divide-stone-500">
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
        <tbody className="bg-white dark:bg-gray-950 divide-y divide-solid divide-stone-500">
          {files.map((file, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                {file.fileType.startsWith('image/') ? (
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    alt={file.fileName}
                    height={200}
                    width={200}
                    className="object-cover"
                    priority={true}
                  />
                ) : (
                  <div className="p-[3px] relative">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg h-16 w-16" />
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{file.fileName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{file.fileType}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {unixTimestampToReadable(parseInt(file.timestamp))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatFileSize(parseInt(file.fileSize))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {file.fileType.startsWith('image/') ? (
                  // Display image directly on the website
                  <Link
                    href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View
                  </Link>
                ) : (
                  // Display link for other file types
                  <Link
                    href={`https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;
