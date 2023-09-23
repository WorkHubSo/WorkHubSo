import express from 'express'
import { delete_job_seekers_byId, get_job_seekers, get_job_seekers_byId, register_job_seekers, update_job_seekers } from '../../controllers/jobSeekers/jobSeeker_controller.js';
export const jobSookersRouter = express.Router();
jobSookersRouter.post('/jobSeeker', register_job_seekers)
jobSookersRouter.get('/jobSeeker', get_job_seekers)
jobSookersRouter.put('/jobSeeker/:id', update_job_seekers)
jobSookersRouter.get('/jobSeeker/:id', get_job_seekers_byId)
jobSookersRouter.delete('/jobSeeker/:id', delete_job_seekers_byId)