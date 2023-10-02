import mongoose from "mongoose";

const employerAccountSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    cover: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    companyBio: {
        type: String,
        required: false
    },
    Industry: {
        type: String,
        required: false
    },
    FoundedIn: {
        type: String,
        required: false
    },
    noEmployee: {
        type: Number,
        required: false
    },
    location: {
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
    instagram: {
        type: String,
        required: false
    },
    linkedIn: {
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

export const employerAccountModel = mongoose.model('employerAccountSchema', employerAccountSchema)