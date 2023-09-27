import mongoose, { Schema } from 'mongoose'
const employerSocialLinksSchema = mongoose.Schema({
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    linkedIn: {
        type: String,
        required: false
    },
    employerId: {
        type: Schema.Types.ObjectId,
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

export const employerSocialLinksModel = mongoose.model('employerSocialLinksSchema', employerSocialLinksSchema)