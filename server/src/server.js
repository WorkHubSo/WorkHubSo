import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WorkHubSoDB } from './model/WorkHubSoDB.js';
import { PORT } from './config/config.js';
import { jobSookersRouter } from './routes/jobSookersRouter/jobSookersRouter.js';
const server = express();
server.use(express.json());
server.use(cors())
server.use(cookieParser())
server.use('/api', jobSookersRouter)
const port = PORT;
WorkHubSoDB()
server.listen(port, () => {
    console.log(`lestening on port ${port}`);
})