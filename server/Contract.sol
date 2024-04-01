// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FileStorageContract {
    struct File {
        string userId;
        string fileName;
        string fileType;
        uint256 fileSize;
        uint256 timestamp;
        bool deleted;
        string ipfsHash; // Add ipfsHash field
    }

    mapping(string => File[]) public filesByUserId; // Mapping from userID to array of Files
    mapping(string => bool) public ipfsHashExists; // Mapping to track existence of IPFS hash

    event FileStored(string ipfsHash, string indexed userId, string fileName, string fileType, uint256 fileSize, uint256 timestamp);
    event FileDeleted(string ipfsHash, string indexed userId, string fileName, string fileType, uint256 fileSize, uint256 timestamp);

    function storeFiles(string[] memory ipfsHashes, string[] memory userIds, string[] memory fileNames, string[] memory fileTypes, uint256[] memory fileSizes, uint256[] memory timestamps) public {
        require(ipfsHashes.length == userIds.length && ipfsHashes.length == fileNames.length && ipfsHashes.length == fileTypes.length && ipfsHashes.length == fileSizes.length && ipfsHashes.length == timestamps.length, "Array lengths must match");
        
        for (uint256 i = 0; i < ipfsHashes.length; i++) {
            require(bytes(ipfsHashes[i]).length != 0, "IPFS hash cannot be empty");
            require(!ipfsHashExists[ipfsHashes[i]], "File already exists");
            require(bytes(userIds[i]).length != 0, "Invalid user ID");
            require(bytes(fileNames[i]).length != 0, "File name cannot be empty");
            require(bytes(fileTypes[i]).length != 0, "File type cannot be empty");
            require(fileSizes[i] > 0, "Invalid file size");
            require(timestamps[i] > 0, "Invalid timestamp");

            File memory newFile = File(userIds[i], fileNames[i], fileTypes[i], fileSizes[i], timestamps[i], false, ipfsHashes[i]); // Include ipfsHash
            filesByUserId[userIds[i]].push(newFile);
            ipfsHashExists[ipfsHashes[i]] = true;
            
            emit FileStored(ipfsHashes[i], userIds[i], fileNames[i], fileTypes[i], fileSizes[i], timestamps[i]);
        }    
    }

    function deleteFile(string memory ipfsHash) public {
        require(bytes(ipfsHash).length != 0, "Invalid IPFS hash");
        require(ipfsHashExists[ipfsHash], "File does not exist");

        string memory userId = "";
        string memory fileName = "";
        string memory fileType = "";
        uint256 fileSize = 0;
        uint256 timestamp = 0;
        bool fileFound = false;

        // Search for the file with the given IPFS hash
        for (uint256 i = 0; i < filesByUserId[userId].length; i++) {
            if (keccak256(abi.encodePacked(filesByUserId[userId][i].userId)) == keccak256(abi.encodePacked(userId)) &&
                keccak256(abi.encodePacked(filesByUserId[userId][i].fileName)) == keccak256(abi.encodePacked(fileName))) {
                // Store file details before deleting
                userId = filesByUserId[userId][i].userId;
                fileName = filesByUserId[userId][i].fileName;
                fileType = filesByUserId[userId][i].fileType;
                fileSize = filesByUserId[userId][i].fileSize;
                timestamp = filesByUserId[userId][i].timestamp;

                filesByUserId[userId][i].deleted = true;
                fileFound = true;
                break;
            }
        }

        require(fileFound, "File not found");

        // Emit event for file deletion
        emit FileDeleted(ipfsHash, userId, fileName, fileType, fileSize, timestamp);
    }

    function getFileByUserId(string memory userId) public view returns (File[] memory, string[] memory) {
        uint256 fileCount = filesByUserId[userId].length;
        File[] memory userFiles = new File[](fileCount);
        string[] memory ipfsHashes = new string[](fileCount);

        for (uint256 i = 0; i < fileCount; i++) {
            File storage file = filesByUserId[userId][i];
            userFiles[i] = file;
            ipfsHashes[i] = file.ipfsHash;
        }

        return (userFiles, ipfsHashes);
    }
}
