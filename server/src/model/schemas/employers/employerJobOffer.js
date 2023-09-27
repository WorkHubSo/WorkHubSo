import mongoose from "mongoose";

const employerJobOfferSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    typeEmployement: {
        type: String,
        required: false
    },
    cover: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    experienceLevel: {
        type: String,
        required: false
    },
    requiredExperience: {
        type: Number,
        required: false
    },
    salary: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: false
    },
    externalUrl: {
        type: String,
        required: false
    },
    branch: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employerAccountSchema'
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

export const employerJobOfferModel = mongoose.model('employerJobOfferSchema', employerJobOfferSchema)