import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { companyAccountModel } from '../../model/schemas/employers/companyAccount.js';
import { jwt_secret } from '../../config/config.js';
export const register_company_account = async(req, res) => {
    try {
        const { companyName, email, password } = req.body;
        const hassedpassword = await bcrypt.hash(password, 10);
        const create_company_account = await new companyAccountModel({
            companyName: companyName,
            email: email,
            password: hassedpassword,
        })

        await create_company_account.save();

        if (!create_company_account) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        }

        res.json({
            message: 'successfully registered company account '
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const login_company_account = async(req, res) => {
    try {

        const { email, password } = req.body;

        const login_company = await companyAccountModel.findOne({
            email: email
        })

        if (!login_company) {
            return res.status(404).json({
                status: false,
                message: 'incorrect email or  password'
            })
        }

        const compare_password = await bcrypt.compare(password, login_company.password);
        if (!compare_password) {
            return res.status(404).json({
                status: false,
                message: 'incorrect email or  password'
            })
        }

        const token = jwt.sign({ _id: login_company._id }, jwt_secret);

        res.cookie('employerToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            token,
            message: 'successfully login'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}
export const get_employer = async(req, res) => {
    try {

        const employer = await companyAccountModel.find();

        if (!employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        res.json({
            employer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_employer = async(req, res) => {
    try {
        const employerId = req.employer._id;
        const employer = await companyAccountModel.findOne({ _id: employerId });

        if (!employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        res.json({
            employer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const get_employer_byId = async(req, res) => {
    try {
        const get_employer = await companyAccountModel.findOne({ _id: req.params.id });

        if (!get_employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        res.json({
            get_employer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const delete_employer = async(req, res) => {
    try {
        const delete_employer = await companyAccountModel.deleteOne({ _id: req.params.id });

        if (!delete_employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        res.json({
            message: ' successfully deleted account '
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_employer = async(req, res) => {
    try {
        const { companyName, email, phone, website, cover, logo, about, industry, founded, location } = req.body

        const update_employer = await companyAccountModel.updateOne({ _id: req.params.id }, {
            $set: {
                companyName: companyName,
                email: email,
                phone: phone,
                website: website,
                cover: cover,
                logo: logo,
                about: about,
                industry: industry,
                founded: founded,
                location: location
            }
        });

        if (!update_employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        res.json({
            message: ' successfully updated '
        })

    } catch (error) {
        console.log('error', error.message);
    }
}