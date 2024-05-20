import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectDB } from "../utils/db";
import {router} from "../route/router"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend domain
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
    credentials: true // Allow cookies to be sent cross-origin
};

app.use(cors(corsOptions));

app.use(router);

const PORT = process.env.PORT || "";

app.listen(PORT, () => {
    console.log(`Alpha is online on ${PORT}`);
    connectDB();
});
