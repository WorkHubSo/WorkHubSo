import { trainingModel } from "../../model/schemas/jobSeekers/jobSeekerTraining.js";

export const add_trainings = async(req, res) => {
    try {

        const { topic, institution, startDate, endDate, description } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_training = await new trainingModel({
            topic: topic,
            institution: institution,
            startDate: startDate,
            endDate: endDate,
            description: description,
            jobSeekerId: jobSeekerId
        });

        await add_training.save();

        if (!add_training) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully added training'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_training = async(req, res) => {
    try {

        const { topic, institution, startDate, endDate, description } = req.body;
        const update_training = await trainingModel.updateOne({ _id: req.params.id }, {
            $set: {
                topic: topic,
                institution: institution,
                startDate: startDate,
                endDate: endDate,
                description: description
            }
        });

        if (!update_training) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully updated training'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_trainings = async(req, res) => {
    try {

        const get_trainings = await trainingModel.find();

        if (!get_trainings) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_trainings
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_trainings = async(req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id;

        const get_trainings = await trainingModel.find({ jobSeekerId: jobSeekerId });

        if (!get_trainings) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_trainings
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_training_byId = async(req, res) => {
    try {

        const get_training = await trainingModel.findOne({ _id: req.params.id });

        if (!get_training) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_training
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const delete_training = async(req, res) => {
    try {

        const delete_training = await trainingModel.deleteOne({ _id: req.params.id });

        if (!delete_training) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: ' successfully deleted training '
        })

    } catch (error) {
        console.log('error', error.message);
    }
}