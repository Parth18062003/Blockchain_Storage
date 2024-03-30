import { ethers } from "ethers";

const uploadHandler = async (req, res) => {
  console.log("Upload handler called");
  try {
    if (!req.body || !req.body.ipfsHash || !req.body.filemetadata) {
      throw new Error(
        "Invalid request body. Missing ipfsHash or filemetadata."
      );
    }
    const ipfsHash = req.body.ipfsHash;
    const filemetadata = req.body.filemetadata; // No need to parse JSON here

    console.log("File Metadata:", filemetadata);
    console.log("Uploaded File:", ipfsHash);
    // Your further processing logic goes here...
    await storeIpfsHashOnEthereum(
      filemetadata.userId,
      filemetadata.name,
      filemetadata.size,
      filemetadata.type,
      ipfsHash
    );

    res.json({ ipfsHash });
  } catch (error) {
    console.error("Error handling upload:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const contractAddress = "0xc9396D8F8f9659ABcC014d951a715A00Ee13955E";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      { indexed: true, internalType: "string", name: "userId", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fileSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FileDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      { indexed: true, internalType: "string", name: "userId", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fileType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fileSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FileStored",
    type: "event",
  },
  {
    inputs: [{ internalType: "string", name: "ipfsHash", type: "string" }],
    name: "deleteFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "filesByUserId",
    outputs: [
      { internalType: "string", name: "userId", type: "string" },
      { internalType: "string", name: "fileName", type: "string" },
      { internalType: "string", name: "fileType", type: "string" },
      { internalType: "uint256", name: "fileSize", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "bool", name: "deleted", type: "bool" },
      { internalType: "string", name: "ipfsHash", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "userId", type: "string" }],
    name: "getFileByUserId",
    outputs: [
      {
        components: [
          { internalType: "string", name: "userId", type: "string" },
          { internalType: "string", name: "fileName", type: "string" },
          { internalType: "string", name: "fileType", type: "string" },
          { internalType: "uint256", name: "fileSize", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "bool", name: "deleted", type: "bool" },
          { internalType: "string", name: "ipfsHash", type: "string" },
        ],
        internalType: "struct FileStorageContract.File[]",
        name: "",
        type: "tuple[]",
      },
      { internalType: "string[]", name: "", type: "string[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "ipfsHashExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "ipfsHashes", type: "string[]" },
      { internalType: "string[]", name: "userIds", type: "string[]" },
      { internalType: "string[]", name: "fileNames", type: "string[]" },
      { internalType: "string[]", name: "fileTypes", type: "string[]" },
      { internalType: "uint256[]", name: "fileSizes", type: "uint256[]" },
      { internalType: "uint256[]", name: "timestamps", type: "uint256[]" },
    ],
    name: "storeFiles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default uploadHandler;

const infuraUrl =
  "https://sepolia.infura.io/v3/8c8cdae365e94b56a67fad79c126cc7e";
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const contract = new ethers.Contract(contractAddress, abi, provider);
const storeIpfsHashOnEthereum = async (
  userId,
  fileName,
  fileSize,
  fileType,
  ipfsHash
) => {
  try {
    // Replace with your private key and configure proper wallet management
    const privateKey =process.env.METAMASK_SECRET_KEY; // Replace with your private key
    const wallet = new ethers.Wallet(privateKey, provider); // Assuming `provider` is properly initialized
    const contractWithSigner = contract.connect(wallet); // Assuming `contract` is properly initialized

    // Call the smart contract function to store the IPFS hash
    const tx = await contractWithSigner.storeFiles(
      [ipfsHash],
      [userId],
      [fileName],
      [fileType],
      [fileSize],
      [Date.now()]
    );
    await tx.wait(); // Wait for the transaction to be mined

    console.log("Transaction submitted. TxHash:", tx.hash);
  } catch (error) {
    console.error("Error storing IPFS hash on Ethereum:", error);
    throw error;
  }
};
