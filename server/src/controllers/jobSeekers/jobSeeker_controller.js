import { jobSeekerModel } from "../../model/schemas/jobSeekers/jobSeekers.js";

export const register_job_seekers = async(req, res) => {
    try {
        const { email, fullName, password } = req.body;
        const findUser = await jobSeekerModel.findOne({
            email: email,
        })
        if (findUser) {
            return res.json({
                message: ' User Already Exists '
            })
        }
        const user = await new jobSeekerModel({
            fullName,
            email,
            password
        })

        user.save();

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User Not Registered'
            })
        };

        res.json('successfull registered');

    } catch (error) {
        console.log(`error`, error);
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

        const { email, username, fullName, photo, address, phone, gender } = req.body

        const fidnUser = await jobSeekerModel.findById({
            _id: req.params.id,
        })

        if (!fidnUser) {
            return res.status(404).json({
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
                photo: photo
            }
        })

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Your Profile not Updated some issues occurs on your content'
            })
        }

        res.json('successfully update your profile information')

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