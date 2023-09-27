import mongoose from "mongoose";

const employerBranchSchema = mongoose.Schema({
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

export const employerBranchModel = mongoose.model('employerBranchSchema', employerBranchSchema)