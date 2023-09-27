import express from 'express'
import { delete_employer, get_current_employer, get_employer, get_employer_byId, login_company_account, register_company_account, update_employer } from '../../controllers/employers_controller/employerAccountController.js';
import { employersAuthenticate } from '../../middlewares/employersMiddleWare.js';
import { add_social_links, delete_social_links, get_current_employer_social_links, get_social_link, get_social_links, update_social_links } from '../../controllers/employers_controller/employerSocialLinksController.js';


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