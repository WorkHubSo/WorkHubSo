import mongoose from "mongoose";

const experienceShema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    employeType: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    locations: {
        type: String,
        required: true
    },
    years: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    jobSeekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobSeekers'
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

export const experienceModel = mongoose.model('experienceShema', experienceShema)