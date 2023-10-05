import express from 'express';
import { Change_password_employer, delete_employer, get_current_employer, get_current_employer_password, get_employer, get_employer_byId, login_company_account, register_company_account, update_employer } from '../../controllers/employers_controller/employerAccountController.js';
import { add_job_offer, delete_job_offer, get_current_employer_job_offers, get_job_offer, get_job_offers, update_job_offer } from '../../controllers/employers_controller/employerJobOfferController.js';
import { employersAuthenticate } from '../../middlewares/employersMiddleWare.js';
import { add_employer_candidates, delete_candidate, get_candidates, update_employer_candidates } from '../../controllers/employers_controller/employerCandidatesController.js';

export const employersRouter = express.Router();
employersRouter.post('/employer/register', register_company_account)
employersRouter.post('/employer/login', login_company_account)
employersRouter.get('/employer', get_employer)
employersRouter.get('/employer/current', employersAuthenticate, get_current_employer)
employersRouter.get('/employer/:id', get_employer_byId)
employersRouter.put('/employer/:id', update_employer)
employersRouter.delete('/employer/:id', delete_employer)
employersRouter.put('/employer/changePassword/:id', Change_password_employer)
employersRouter.get('/employer/currentPassword', employersAuthenticate, get_current_employer_password)
employersRouter.post('/employerjobOffer/add', employersAuthenticate, add_job_offer)
employersRouter.get('/employerjobOffer/current', employersAuthenticate, get_current_employer_job_offers)
employersRouter.get('/employerjobOffer', get_job_offers)
employersRouter.get('/employerjobOffer/:id', get_job_offer)
employersRouter.delete('/employerjobOffer/:id', delete_job_offer)
employersRouter.put('/employerjobOffer/:id', employersAuthenticate, update_job_offer)
employersRouter.post('/employerCandidate/add', add_employer_candidates)
employersRouter.get('/employerCandidate', get_candidates)
employersRouter.put('/employerCandidate', update_employer_candidates)
employersRouter.delete('/employerCandidate', delete_candidate)