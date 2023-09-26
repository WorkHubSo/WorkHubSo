import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WorkHubSoDB } from './model/WorkHubSoDB.js';
// import { PORT } from './config/config.js';
import { jobSookersRouter } from './routes/jobSookersRouter/jobSookersRouter.js';
import { employersRouter } from './routes/employersRouter/employersRouter.js';
const server = express();
server.use(express.json());
server.use(cors())
server.use(cookieParser())
server.use('/api', jobSookersRouter)
server.use('/api', employersRouter)
const port = 8000
WorkHubSoDB()
server.listen(port, () => {
    console.log(`lestening on port ${port}`);
})