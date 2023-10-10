import { educationModel } from "../../model/schemas/jobSeekers/jobSeekersEduaction.js";

export const add_education = async(req, res) => {
    try {

        const { degree, institution, graduationDate, honor, gba, description } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_education = await new educationModel({
            degree: degree,
            institution: institution,
            graduationDate: graduationDate,
            honor: honor,
            gba: gba,
            description: description,
            jobSeekerId: jobSeekerId
        })

        await add_education.save();

        if (!add_education) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully added education '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}

export const update_education = async(req, res) => {
    try {
        const { degree, institution, graduationDate, honor, gba, description } = req.body;
        const update_education = await educationModel.updateOne({ _id: req.params.id }, {
            $set: {
                degree: degree,
                institution: institution,
                graduationDate: graduationDate,
                honor: honor,
                gba: gba,
                description: description,
            }
        })

        if (!update_education) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully updated education '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}



export const get_educations = async(req, res) => {
    try {
        const get_educations = await educationModel.find()

        if (!get_educations) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_educations
        })
    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_educations = async(req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id;
        const get_educations = await educationModel.find({ jobSeekerId: jobSeekerId })

        if (!get_educations) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_educations
        })
    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_education_byId = async(req, res) => {
    try {

        const get_education = await educationModel.findOne({ _id: req.params.id })

        if (!get_education) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_education
        })
    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_education = async(req, res) => {
    try {

        const delete_education = await educationModel.deleteOne({ _id: req.params.id })

        if (!delete_education) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: ' successfully deleted education '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}