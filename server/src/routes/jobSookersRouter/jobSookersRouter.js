import express from 'express'
import { delete_job_seekers_byId, get_current_job_seeker, get_job_seekers, get_job_seekers_byId, login_job_seekers, register_job_seekers, update_job_seekers } from '../../controllers/jobSeekers/jobSeeker_controller.js';
import { jobSeekerAuthenticate } from '../../middlewares/jobSeekerMiddleWares.js';
import { add_reference, delete_reference, get_reference_byId, get_references, update_reference } from '../../controllers/jobSeekers/referenceController.js';
import { add_category, delete_category, get_categories, get_category, get_category_byId, update_category } from '../../controllers/jobSeekers/categoryController.js';
import { add_certificate, delete_certificate, get_certificate, get_certificate_byId, update_certificate } from '../../controllers/jobSeekers/certificateController.js';
import { add_skill, delete_skill, get_skill_byId, get_skills, update_skill } from '../../controllers/jobSeekers/skillsController.js';
import { add_language, delete_language, get_language_byId, get_languages, update_language } from '../../controllers/jobSeekers/languageController.js';
import { add_education, delete_education, get_education_byId, get_educations, update_education } from '../../controllers/jobSeekers/educationController.js';
import { add_experience, delete_experience, get_experience_byId, get_experiences, update_experience } from '../../controllers/jobSeekers/experienceController.js';
import { delete_social_profile, get_social_profile_byId, get_social_profiles, update_social_profile, add_social_profile } from '../../controllers/jobSeekers/socialProfileController.js';
import { add_trainings, delete_training, get_training_byId, get_trainings, update_training } from '../../controllers/jobSeekers/trainingController.js';
export const jobSookersRouter = express.Router();
jobSookersRouter.post('/jobSeeker/register', register_job_seekers)
jobSookersRouter.get('/jobSeeker', get_job_seekers)
jobSookersRouter.get('/jobSeeker/current', jobSeekerAuthenticate, get_current_job_seeker)
jobSookersRouter.put('/jobSeeker/:id', update_job_seekers)
jobSookersRouter.get('/jobSeeker/:id', get_job_seekers_byId)
jobSookersRouter.delete('/jobSeeker/:id', delete_job_seekers_byId)
jobSookersRouter.post('/jobSeeker/login', login_job_seekers)
jobSookersRouter.post('/reference/add', jobSeekerAuthenticate, add_reference)
jobSookersRouter.get('/reference', jobSeekerAuthenticate, get_references)
jobSookersRouter.put('/reference/:id', jobSeekerAuthenticate, update_reference)
jobSookersRouter.delete('/reference/:id', jobSeekerAuthenticate, delete_reference)
jobSookersRouter.get('/reference/:id', jobSeekerAuthenticate, get_reference_byId)
jobSookersRouter.post('/category/add', jobSeekerAuthenticate, add_category)
jobSookersRouter.get('/category/current', jobSeekerAuthenticate, get_category)
jobSookersRouter.get('/category', get_categories)
jobSookersRouter.put('/category/:id', jobSeekerAuthenticate, update_category)
jobSookersRouter.get('/category/:id', jobSeekerAuthenticate, get_category_byId)
jobSookersRouter.delete('/category/:id', jobSeekerAuthenticate, delete_category)
jobSookersRouter.post('/certificate/add', jobSeekerAuthenticate, add_certificate)
jobSookersRouter.get('/certificate', jobSeekerAuthenticate, get_certificate)
jobSookersRouter.get('/certificate/:id', get_certificate_byId)
jobSookersRouter.put('/certificate/:id', jobSeekerAuthenticate, update_certificate)
jobSookersRouter.delete('/certificate/:id', delete_certificate)
jobSookersRouter.post('/skill/add', jobSeekerAuthenticate, add_skill)
jobSookersRouter.get('/skill', jobSeekerAuthenticate, get_skills)
jobSookersRouter.get('/skill/:id', get_skill_byId)
jobSookersRouter.put('/skill/:id', update_skill)
jobSookersRouter.delete('/skill/:id', delete_skill)
jobSookersRouter.post('/language/add', jobSeekerAuthenticate, add_language)
jobSookersRouter.get('/language', jobSeekerAuthenticate, get_languages)
jobSookersRouter.get('/language/:id', get_language_byId)
jobSookersRouter.put('/language/:id', update_language)
jobSookersRouter.delete('/language/:id', delete_language)
jobSookersRouter.post('/education/add', jobSeekerAuthenticate, add_education)
jobSookersRouter.get('/education', jobSeekerAuthenticate, get_educations)
jobSookersRouter.get('/education/:id', get_education_byId)
jobSookersRouter.put('/education/:id', update_education)
jobSookersRouter.delete('/education/:id', delete_education)
jobSookersRouter.post('/experience/add', jobSeekerAuthenticate, add_experience)
jobSookersRouter.get('/experience', jobSeekerAuthenticate, get_experiences)
jobSookersRouter.get('/experience/:id', get_experience_byId)
jobSookersRouter.put('/experience/:id', update_experience)
jobSookersRouter.delete('/experience/:id', delete_experience)
jobSookersRouter.post('/socialProfile/add', jobSeekerAuthenticate, add_social_profile)
jobSookersRouter.get('/socialProfile', jobSeekerAuthenticate, get_social_profiles)
jobSookersRouter.get('/socialProfile/:id', get_social_profile_byId)
jobSookersRouter.put('/socialProfile/:id', update_social_profile)
jobSookersRouter.delete('/socialProfile/:id', delete_social_profile)
jobSookersRouter.post('/training/add', jobSeekerAuthenticate, add_trainings)
jobSookersRouter.get('/training', jobSeekerAuthenticate, get_trainings)
jobSookersRouter.get('/training/:id', get_training_byId)
jobSookersRouter.put('/training/:id', update_training)
jobSookersRouter.delete('/training/:id', delete_training)