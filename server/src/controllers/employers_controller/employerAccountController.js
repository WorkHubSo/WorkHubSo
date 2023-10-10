import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_secret } from '../../config/config.js';
import { employerAccountModel } from '../../model/schemas/employers/employerAccount.js';
export const register_company_account = async(req, res) => {
    try {
        const { companyName, email, password } = req.body;
        const hassedpassword = await bcrypt.hash(password, 10);
        const create_company_account = await new employerAccountModel({
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

        const login_company = await employerAccountModel.findOne({
            email: email
        })

        if (!login_company) {
            return res.json({
                status: false,
                message: 'incorrect email or  password'
            })
        }

        const compare_password = await bcrypt.compare(password, login_company.password);
        if (compare_password) {
            const token = jwt.sign({ _id: login_company._id }, jwt_secret);

            res.cookie('employerToken', token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({
                token,
                status: true,
                message: 'successfully login'
            })
        } else {
            return res.json({
                status: false,
                message: 'incorrect email or  password'
            })
        }

    } catch (error) {
        console.log('error', error);
    }
}
export const get_employer = async(req, res) => {
    try {

        const employer = await employerAccountModel.find();

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
        const employer = await employerAccountModel.findOne({ _id: employerId });

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
        const get_employer = await employerAccountModel.findOne({ _id: req.params.id });

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
        const delete_employer = await employerAccountModel.deleteOne({ _id: req.params.id });

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
        const {
            companyName,
            email,
            phone,
            website,
            cover,
            logo,
            companyBio,
            industry,
            FoundedIn,
            noEmployee,
            location,
            facebook,
            twitter,
            instagram,
            linkedIn
        } = req.body

        const update_employer = await employerAccountModel.updateOne({ _id: req.params.id }, {
            $set: {
                companyName: companyName,
                email: email,
                phone: phone,
                website: website,
                cover: cover,
                logo: logo,
                companyBio: companyBio,
                FoundedIn: FoundedIn,
                industry: industry,
                noEmployee: noEmployee,
                location: location,
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                linkedIn: linkedIn
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


export const Change_password_employer = async(req, res) => {
    try {
        const { currentPassword, NewPassword } = req.body;
        const current_employer = await employerAccountModel.findOne({ _id: req.params.id })
        if (!current_employer) {
            return res.json({
                status: false,
                message: 'something went wrong try again'
            })
        } else {
            const compare_password = await bcrypt.compare(currentPassword, current_employer.password);
            if (compare_password) {
                const hass_password = await bcrypt.hash(NewPassword, 10)
                const updatedPassword = await employerAccountModel.updateOne({ _id: current_employer._id }, {
                    $set: {
                        password: hass_password
                    }
                })
                if (!updatedPassword) {
                    res.json({
                        status: false,
                        message: 'something went wrong try again.'
                    })
                } else {
                    res.json({
                        status: true,
                        message: 'successfull changed password.'
                    })
                }
            } else {

                res.json({
                    status: false,
                    message: 'current password is invalid try again.'
                })

            }

        }

    } catch (error) {
        console.log('error', error);
    }
}



export const get_current_employer_password = async(req, res) => {
    try {
        const { currentPassword } = req.body;
        const employerId = req.employer._id;
        const employer = await employerAccountModel.findOne({ _id: employerId });
        if (!employer) {
            return res.status(404).json({
                status: false,
                message: 'something is wrong try again'
            })
        }

        const compare_password = await bcrypt.compare(currentPassword, employer.password);

        res.json({
            compare_password
        })

    } catch (error) {
        console.log('error', error.message);
    }
}