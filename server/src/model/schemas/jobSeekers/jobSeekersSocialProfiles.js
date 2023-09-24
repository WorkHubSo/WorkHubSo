import mongoose, { mongo } from "mongoose";

const socailProfileSchema = mongoose.Schema({
    linkedIn: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    Youtube: {
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
export const socailProfileModel = mongoose.model('socailProfileSchema', socailProfileSchema)