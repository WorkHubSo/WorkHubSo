import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WorkHubSoDB } from './model/WorkHubSoDB.js';
// import { PORT } from './config/config.js';
import { jobSookersRouter } from './routes/jobSookersRouter/jobSookersRouter.js';
import { employersRouter } from './routes/employersRouter/employersRouter.js';
import multer from 'multer';
const server = express();
server.use(express.json());
server.use(cors())
server.use(cookieParser())
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../../client/public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage });
server.post('/api/upload', upload.single('file'), function(req, res) {
    const file = req.file
    return res.status(200).json(file.filename)
})
server.use('/api/upload', (req, res) => {
    return res.send('success')
})
server.use('/api', jobSookersRouter)
server.use('/api', employersRouter)
const port = 8000
WorkHubSoDB()
server.listen(port, () => {
    console.log(`lestening on port ${port}`);
})