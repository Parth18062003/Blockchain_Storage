const uploadHandler = async (req, res) => {
    console.log("Upload handler called");
    try {
        const ipfsHash = req.body.ipfsHash;
        const filemetadata = req.body.filemetadata; // No need to parse JSON here
        console.log("File Metadata:", filemetadata);
        console.log("Uploaded File:", ipfsHash);
    
        // Your further processing logic goes here...

        res.json({ ipfsHash });
    } catch (error) {
        console.error("Error handling upload:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export default uploadHandler;
