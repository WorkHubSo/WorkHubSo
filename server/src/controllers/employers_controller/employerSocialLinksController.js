import { employerSocialLinksModel } from "../../model/schemas/employers/employerSocialLinks.js";

export const add_social_links = async(req, res) => {
    try {

        const { facebook, twitter, instagram, linkedIn } = req.body
        const employerId = req.employer._id

        const add_social_links = await new employerSocialLinksModel({
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            linkedIn: linkedIn,
            employerId: employerId
        });

        await add_social_links.save();

        if (!add_social_links) {
            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }
        res.json({
            message: 'successfully added social links'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const update_social_links = async(req, res) => {
    try {

        const { facebook, twitter, instagram, linkedIn } = req.body
        const employerId = req.employer._id

        const update_social_links = await employerSocialLinksModel.updateOne({ _id: req.params.id }, {
            $set: {
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                linkedIn: linkedIn,
                employerId: employerId
            }
        });

        if (!update_social_links) {
            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }
        res.json({
            message: 'successfully updated social links'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_social_links = async(req, res) => {
    try {

        const get_social_link = await employerSocialLinksModel.find()

        if (!get_social_link) {

            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })

        }

        res.json({
            get_social_link
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_social_link = async(req, res) => {
    try {

        const get_social_link = await employerSocialLinksModel.findOne({ _id: req.params.id })

        if (!get_social_link) {

            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })

        }

        res.json({
            get_social_link
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const get_current_employer_social_links = async(req, res) => {
    try {

        const employerId = req.employer._id
        const get_social_link = await employerSocialLinksModel.find({ employerId: employerId })

        if (!get_social_link) {

            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })

        }

        res.json({
            get_social_link
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_social_links = async(req, res) => {
    try {

        const delete_social_link = await employerSocialLinksModel.deleteOne({ _id: req.params.id })

        if (!delete_social_link) {

            res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })

        }

        res.json({
            message: 'successfully deleted social link'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}