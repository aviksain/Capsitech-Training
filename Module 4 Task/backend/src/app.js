import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

import userRouter from './routes/users.routes.js';
import todoRouter from './routes/todo.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

export default app;