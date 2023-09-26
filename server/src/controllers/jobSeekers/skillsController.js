import { skillsModel } from "../../model/schemas/jobSeekers/jobSeekerSkills.js";

export const add_skill = async(req, res) => {
    try {

        const { skill } = req.body
        const jobSeekerId = req.jobSeeker._id;

        const add_skills = await new skillsModel({
            skill: skill,
            jobSeekerId: jobSeekerId
        })

        await add_skills.save();

        if (!add_skills) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully added skill'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const update_skill = async(req, res) => {
    try {

        const { skill } = req.body

        const update_skills = await skillsModel.updateOne({ _id: req.params.id }, {
            $set: {
                skill: skill,
            }
        })

        if (!update_skills) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully updated skill'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_skills = async(req, res) => {
    try {

        const jobSeekerId = req.jobSeeker._id;

        const get_skills = await skillsModel.find({ jobSeekerId: jobSeekerId });

        if (!get_skills) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_skills
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const delete_skill = async(req, res) => {
    try {

        const delete_skill = await skillsModel.deleteOne({ _id: req.params.id });

        if (!delete_skill) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully deleted skill'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_skill_byId = async(req, res) => {
    try {

        const get_skill = await skillsModel.findOne({ _id: req.params.id });

        if (!get_skill) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_skill
        })

    } catch (error) {
        console.log('error', error.message);
    }
}