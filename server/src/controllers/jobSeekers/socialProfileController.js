import { socailProfileModel } from "../../model/schemas/jobSeekers/jobSeekersSocialProfiles.js";

export const add_social_profile = async(req, res) => {
    try {

        const { linkedIn, facebook, twitter, github, linkTree, Youtube } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_social_links = await new socailProfileModel({
            linkedIn: linkedIn,
            facebook: facebook,
            twitter: twitter,
            github: github,
            linkTree: linkTree,
            Youtube: Youtube,
            jobSeekerId: jobSeekerId
        })

        await add_social_links.save();

        if (!add_social_links) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully added social links'
        })


    } catch (error) {
        console.log('error', error.message);
    }
}



export const update_social_profile = async(req, res) => {
    try {

        const { linkedIn, facebook, twitter, github, linkTree, Youtube } = req.body;

        const update_social_links = await socailProfileModel.updateOne({ _id: req.params.id }, {
            $set: {
                linkedIn: linkedIn,
                facebook: facebook,
                twitter: twitter,
                github: github,
                linkTree: linkTree,
                Youtube: Youtube
            }
        })

        if (!update_social_links) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully update social links'
        })


    } catch (error) {
        console.log('error', error.message);
    }
}



export const get_social_profiles = async(req, res) => {
    try {
        const get_social_links = await socailProfileModel.find()

        if (!get_social_links) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_social_links
        })


    } catch (error) {
        console.log('error', error.message);
    }
}


export const get__current_social_profiles = async(req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id;
        const get_social_links = await socailProfileModel.find({ jobSeekerId: jobSeekerId })

        if (!get_social_links) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_social_links
        })


    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_social_profile_byId = async(req, res) => {
    try {

        const get_social_link = await socailProfileModel.findOne({ _id: req.params.id })

        if (!get_social_link) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_social_link
        })


    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_social_profile = async(req, res) => {
    try {

        const delete_social_link = await socailProfileModel.deleteOne({ _id: req.params.id })

        if (!delete_social_link) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: ' successfully deleted social links '
        })


    } catch (error) {
        console.log('error', error.message);
    }
}