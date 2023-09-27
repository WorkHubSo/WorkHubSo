import express from 'express'
import { delete_employer, get_current_employer, get_employer, get_employer_byId, login_company_account, register_company_account, update_employer } from '../../controllers/employers_controller/employerAccountController.js';
import { employersAuthenticate } from '../../middlewares/employersMiddleWare.js';
import { add_social_links, delete_social_links, get_current_employer_social_links, get_social_link, get_social_links, update_social_links } from '../../controllers/employers_controller/employerSocialLinksController.js';
import { add_branch_location, delete_branch_location, get_branch_location, get_branch_locations, get_current_employer_branch_location, update_branch_location } from '../../controllers/employers_controller/employerBranchController.js';
import { add_job_offer, delete_job_offer, get_current_employer_job_offers, get_job_offer, get_job_offers, update_job_offer } from '../../controllers/employers_controller/employerJobOfferController.js';


export const employersRouter = express.Router();
employersRouter.post('/employer/register', register_company_account)
employersRouter.post('/employer/login', login_company_account)
employersRouter.get('/employer', get_employer)
employersRouter.get('/employer/current', employersAuthenticate, get_current_employer)
employersRouter.get('/employer/:id', get_employer_byId)
employersRouter.put('/employer/:id', update_employer)
employersRouter.delete('/employer/:id', delete_employer)
employersRouter.post('/employerLinks/add', employersAuthenticate, add_social_links)
employersRouter.get('/employerLinks/current', employersAuthenticate, get_current_employer_social_links)
employersRouter.get('/employerLinks', get_social_links)
employersRouter.get('/employerLinks/:id', get_social_link)
employersRouter.put('/employerLinks/:id', employersAuthenticate, update_social_links)
employersRouter.delete('/employerLinks/:id', delete_social_links)
employersRouter.post('/employerBranch/add', employersAuthenticate, add_branch_location)
employersRouter.put('/employerBranch/:id', employersAuthenticate, update_branch_location)
employersRouter.get('/employerBranch/current', employersAuthenticate, get_current_employer_branch_location)
employersRouter.get('/employerBranch', get_branch_locations)
employersRouter.get('/employerBranch/:id', get_branch_location)
employersRouter.delete('/employerBranch/:id', delete_branch_location)
employersRouter.post('/employerjobOffer/add', employersAuthenticate, add_job_offer)
employersRouter.get('/employerjobOffer/current', employersAuthenticate, get_current_employer_job_offers)
employersRouter.get('/employerjobOffer', get_job_offers)
employersRouter.get('/employerjobOffer/:id', get_job_offer)
employersRouter.delete('/employerjobOffer/:id', delete_job_offer)
employersRouter.put('/employerjobOffer/:id', employersAuthenticate, update_job_offer)