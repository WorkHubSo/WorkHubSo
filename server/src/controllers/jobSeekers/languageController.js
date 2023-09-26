import { languageModel } from "../../model/schemas/jobSeekers/jobSeekersLanguage.js";

export const add_language = async(req, res) => {
    try {
        const { language } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_language = await new languageModel({
            language: language,
            jobSeekerId: jobSeekerId
        })

        await add_language.save();

        if (!add_language) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully added language '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_language = async(req, res) => {
    try {
        const { language } = req.body;
        const update_language = await languageModel.updateOne({ _id: req.params.id }, {
            $set: {
                language: language,
            }
        })

        if (!update_language) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: 'successfully updated language '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_languages = async(req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id;

        const get_language = await languageModel.find({ jobSeekerId: jobSeekerId })

        if (!get_language) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_language
        })
    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_language_byId = async(req, res) => {
    try {

        const get_language = await languageModel.findOne({ _id: req.params.id })

        if (!get_language) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_language
        })
    } catch (error) {
        console.log('error', error.message);
    }
}

export const delete_language = async(req, res) => {
    try {

        const delete_language = await languageModel.deleteOne({ _id: req.params.id })

        if (!delete_language) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            message: ' successfully deleted language '
        })
    } catch (error) {
        console.log('error', error.message);
    }
}