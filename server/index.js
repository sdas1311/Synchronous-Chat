import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(databaseURL).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.log('Error:', error.message);
});