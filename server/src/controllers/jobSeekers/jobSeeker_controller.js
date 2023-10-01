import { jobSeekerModel } from "../../model/schemas/jobSeekers/jobSeekers.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwt_secret } from "../../config/config.js";

export const register_job_seekers = async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const user_exist = await jobSeekerModel.findOne({
            email: email
        })

        if (user_exist) {
            return res.json({
                status: false,
                message: 'user already exists',
            })
        }
        const hassedPassword = await bcrypt.hash(password, 10);
        const user = new jobSeekerModel({
            fullName: fullName,
            email: email,
            password: hassedPassword
        })

        await user.save();

        res.json({
            status: true,
            message: 'successfully registered'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const login_job_seekers = async(req, res) => {
    try {

        const { email, password } = req.body;

        const user = await jobSeekerModel.findOne({
            email: email,
        })

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'incorrect email and password'
            })
        }

        const compare_password = await bcrypt.compare(password, user.password)
        if (!compare_password) {
            return res.json({
                status: false,
                message: 'incorrect email and password',
            })
        } else {
            const token = jwt.sign({ _id: user._id }, jwt_secret)
            res.cookie('jobSeekerToken', token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.json({
                status: true,
                message: 'successfully sign in',
                token
            })
        }
    } catch (error) {
        console.log('error', error);
    }
}

export const get_job_seekers = async(req, res) => {
    try {

        const user = await jobSeekerModel.find();
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Not Found Any Job Seekers'
            })
        }

        res.json({
            user
        })

    } catch (error) {
        console.log('error', error);
    }
}

export const update_job_seekers = async(req, res) => {
    try {

        const { email, username, fullName, photo, address, phone, gender, aboutMe } = req.body

        const fidnUser = await jobSeekerModel.findById({
            _id: req.params.id,
        })

        if (!fidnUser) {
            return res.json({
                status: false,
                message: 'Job Seeker not found'
            })
        }

        const user = await jobSeekerModel.updateOne({ _id: req.params.id }, {
            $set: {
                fullName: fullName,
                email: email,
                username: username,
                gender: gender,
                phone: phone,
                address: address,
                photo: photo,
                aboutMe: aboutMe
            }
        })

        if (!user) {
            return res.json({
                status: false,
                message: 'Your Profile not Updated some issues occurs on your content'
            })
        }

        res.json({
            status: true,
            message: 'successfully update your profile information'
        })

    } catch (error) {
        console.log('error', error);
    }
}


export const get_job_seekers_byId = async(req, res) => {
    try {

        const user = await jobSeekerModel.findById({ _id: req.params.id })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Job Seeker not found'
            })
        }

        res.json(user)
    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_job_seeker = async(req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id;
        const user = await jobSeekerModel.findOne({ _id: jobSeekerId })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Job Seeker not found'
            })
        }
        res.json(user)
    } catch (error) {
        console.log('error', error.message);
    }
}
export const delete_job_seekers_byId = async(req, res) => {
    try {

        const user = await jobSeekerModel.deleteOne({ _id: req.params.id })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Job Seeker not found'
            })
        }

        res.json('successfully deleted Job Seeker')
    } catch (error) {
        console.log('error', error.message);
    }
}