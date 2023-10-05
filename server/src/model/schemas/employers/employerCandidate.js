import mongoose from "mongoose";

const employerCandidateShema = mongoose.Schema({
    JobOfferId: {
        type: String,
        required: false
    },
    jobSeekerId: {
        type: String,
        required: false
    },
    jobSeekerName: {
        type: String,
        required: false
    },
    jobSeekerEmail: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    },
    jobCategory: {
        type: String,
        required: false
    },
    jobSeekerResume: {
        type: String,
        required: false
    },
    jobOfferStatus: {
        type: String,
        required: false
    },
    createAt: {
        type: Date,
        default: () => Date.now()
    },
    updateAt: {
        type: Date,
        default: () => Date.now()
    }
})

export const employerCandidatesModel = mongoose.model('employerCandidateShema', employerCandidateShema)