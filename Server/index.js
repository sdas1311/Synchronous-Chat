import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const database_url = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ['GET', 'POST', 'PUT', "PATCH" , 'DELETE'],
        credentials: true,
    })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

mongoose.connect(database_url)
.then(() => {
    console.log('Connected to the database');
})
.catch((err) => {
    console.log(err.message);
});








