import express from 'express';
import { config } from 'dotenv';
const app = express();
const PORT = process.env.PORT || 3000;

config();
import connectDB from './app/config/connectDB.js';



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});