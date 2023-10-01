import { experienceModel } from "../../model/schemas/jobSeekers/jobSeekersExperience.js";

export const add_experience = async(req, res) => {

    try {
        const { jobTitle, category, employeType, companyName, locations, years, description } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_experience = await new experienceModel({
            jobTitle: jobTitle,
            category: category,
            employeType: employeType,
            companyName: companyName,
            locations: locations,
            years: years,
            description: description,
            jobSeekerId: jobSeekerId
        })

        await add_experience.save();

        if (!add_experience) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully added experience'
        })
    } catch (error) {
        console.log('error', error.message);
    }

}


export const update_experience = async(req, res) => {

    try {
        const { jobTitle, category, employeType, companyName, locations, years, description } = req.body;
        const update_experience = await experienceModel.updateOne({ _id: req.params.id }, {
            $set: {
                jobTitle: jobTitle,
                category: category,
                employeType: employeType,
                companyName: companyName,
                locations: locations,
                years: years,
                description: description,
            }
        })

        if (!update_experience) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully updated experience'
        })
    } catch (error) {
        console.log('error', error.message);
    }

}



export const get_experiences = async(req, res) => {
    try {

        const get_experiences = await experienceModel.find()

        if (!get_experiences) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_experiences
        })
    } catch (error) {
        console.log('error', error.message);
    }

}


export const get_current_experiences = async(req, res) => {
    try {

        const jobSeekerId = req.jobSeeker._id;

        const get_experiences = await experienceModel.find({ jobSeekerId: jobSeekerId })

        if (!get_experiences) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_experiences
        })
    } catch (error) {
        console.log('error', error.message);
    }

}


export const get_experience_byId = async(req, res) => {
    try {

        const get_experience = await experienceModel.findOne({ _id: req.params.id })

        if (!get_experience) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_experience
        })
    } catch (error) {
        console.log('error', error.message);
    }

}


export const delete_experience = async(req, res) => {
    try {

        const delete_experience = await experienceModel.deleteOne({ _id: req.params.id })

        if (!delete_experience) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            delete_experience
        })
    } catch (error) {
        console.log('error', error.message);
    }

}