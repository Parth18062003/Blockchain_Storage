import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';    
import uploadHandler from './handlers/uploadHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4321;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`<h1>Server is running on port ${PORT}</h1>`);
});

app.use("/upload", uploadHandler);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

