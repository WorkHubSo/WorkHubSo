import { employerJobOfferModel } from "../../model/schemas/employers/employerJobOffer.js";

export const add_job_offer = async(req, res) => {
    try {

        const { jobTitle, category, typeEmployement, cover, description, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location } = req.body;
        const employerId = req.employer._id;

        const add_job_offer = await new employerJobOfferModel({
            jobTitle: jobTitle,
            category: category,
            typeEmployement: typeEmployement,
            cover: cover,
            description: description,
            experienceLevel: experienceLevel,
            requiredExperience: requiredExperience,
            salary: salary,
            deadline: deadline,
            externalUrl: externalUrl,
            branch: branch,
            location: location,
            employerId: employerId
        })

        await add_job_offer.save()

        if (!add_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        } else {
            return res.json({
                status: true,
                message: 'successfully added job offer',
            })
        }

    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_job_offer = async(req, res) => {
    try {

        const { jobTitle, category, typeEmployement, cover, description, experienceLevel, requiredExperience, salary, deadline, externalUrl, branch, location } = req.body;
        const employerId = req.employer._id;

        const update_job_offer = await employerJobOfferModel.updateOne({ _id: req.params.id }, {
            $set: {
                jobTitle: jobTitle,
                category: category,
                typeEmployement: typeEmployement,
                cover: cover,
                description: description,
                experienceLevel: experienceLevel,
                requiredExperience: requiredExperience,
                salary: salary,
                deadline: deadline,
                externalUrl: externalUrl,
                branch: branch,
                location: location,
                employerId: employerId
            }
        })

        if (!update_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        } else {
            return res.json({
                status: true,
                message: 'successfully updated job offer',
            })
        }

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_job_offers = async(req, res) => {
    try {

        const get_job_offer = await employerJobOfferModel.find();

        if (!get_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        }

        res.json({
            get_job_offer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_employer_job_offers = async(req, res) => {
    try {

        const employerId = req.employer._id;

        const get_job_offer = await employerJobOfferModel.find({ employerId: employerId });

        if (!get_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        }

        res.json({
            get_job_offer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_job_offer = async(req, res) => {
    try {

        const get_job_offer = await employerJobOfferModel.findOne({ _id: req.params.id });

        if (!get_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        }

        res.json({
            get_job_offer
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_job_offer = async(req, res) => {
    try {

        const delete_job_offer = await employerJobOfferModel.deleteOne({ _id: req.params.id });

        if (!delete_job_offer) {
            return res.status(404).json({
                status: false,
                message: 'something wrong please try again'
            })
        }

        res.json({
            message: 'successfully deleted job offer',
        })

    } catch (error) {
        console.log('error', error.message);
    }
}