import { employerCandidatesModel } from "../../model/schemas/employers/employerCandidate.js";

export const add_employer_candidates = async(req, res) => {
    try {
        const {
            JobOfferId,
            jobSeekerId,
            jobSeekerName,
            jobSeekerEmail,
            jobTitle,
            jobCategory,
            jobSeekerImage,
            jobSeekerResume,
            jobOfferStatus,
        } = req.body
        const candidates = await new employerCandidatesModel({
            JobOfferId: JobOfferId,
            jobSeekerId: jobSeekerId,
            jobSeekerName: jobSeekerName,
            jobSeekerEmail: jobSeekerEmail,
            jobTitle: jobTitle,
            jobCategory: jobCategory,
            jobSeekerImage: jobSeekerImage,
            jobSeekerResume: jobSeekerResume,
            jobOfferStatus: jobOfferStatus
        })
        await candidates.save();
        if (!candidates) {
            return req.json({
                status: false,
                message: 'something wrong please try again later'
            })
        }
        res.json({
            status: true,
            message: 'successfully registered'
        });

    } catch (error) {
        console.log('error', error);
    }
}


export const update_employer_candidates = async(req, res) => {
    try {
        const {
            jobOfferStatus
        } = req.body

        const candidates = await employerCandidatesModel.updateOne({ _id: req.params.id }, {
            $set: {
                jobOfferStatus: jobOfferStatus
            }
        })

        if (!candidates) {
            return req.json({
                status: false,
                message: 'something wrong please try again later'
            })
        }
        res.json({
            status: true,
            message: 'successfully updated',
            candidates
        });

    } catch (error) {
        console.log('error', error);
    }
}


export const get_candidates = async(req, res) => {
    try {

        const candidates = await employerCandidatesModel.find()
        if (!candidates) {
            return req.json({
                status: false,
                message: 'something wrong please try again later'
            })
        }
        res.json({
            status: true,
            candidates
        });

    } catch (error) {
        console.log('error', error);
    }
}

export const delete_candidate = async(req, res) => {
    try {

        const candidates = await employerCandidatesModel.deleteOne({ _id: req.params.id })
        if (!candidates) {
            return req.json({
                status: false,
                message: 'something wrong please try again later'
            })
        }
        res.json({
            status: true,
            message: 'successfully deleted'
        });

    } catch (error) {
        console.log('error', error);
    }
}