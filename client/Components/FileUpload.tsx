"use client"
import React, { useState } from 'react';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setUploadedFiles(files);
    }
  };

  const handlePreview = (file: File) => {
    if (file.type === 'application/pdf') {
      // Open PDF in another tab
      window.open(URL.createObjectURL(file), '_blank');
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Download DOCX file
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } 
    // Add handling for other file types if needed
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center bg-customwhite dark:bg-customblack">
      <label
        htmlFor="file-upload"
        className="relative bg-[#e9e8e8] dark:bg-slate-800 border-2 border-dashed dark:border-gray-300 border-gray-600 rounded-lg p-28 cursor-pointer"
      >
        <input
          id="file-upload"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
          onChange={handleFileChange}
        />
        <span className="block text-center dark:text-gray-400 text-gray-700">Drag and drop or select files</span>
      </label>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="max-w-sm my-1">
            {file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-auto" />
            ) : (
              <button className="text-blue-500 underline" onClick={() => handlePreview(file)}>
                {file.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;