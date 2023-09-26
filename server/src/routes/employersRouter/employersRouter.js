import express from 'express'
import { delete_employer, get_current_employer, get_employer, get_employer_byId, login_company_account, register_company_account, update_employer } from '../../controllers/employers_controller/companyAccountController.js';
import { employersAuthenticate } from '../../middlewares/employersMiddleWare.js';


export const employersRouter = express.Router();
employersRouter.post('/employer/register', register_company_account)
employersRouter.post('/employer/login', login_company_account)
employersRouter.get('/employer', get_employer)
employersRouter.get('/employer/current', employersAuthenticate, get_current_employer)
employersRouter.get('/employer/:id', get_employer_byId)
employersRouter.put('/employer/:id', update_employer)
employersRouter.delete('/employer/:id', delete_employer)