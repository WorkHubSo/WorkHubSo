import mongoose from "mongoose";
const referenceSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
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

export const referenceModel = mongoose.model('referenceSchema', referenceSchema)