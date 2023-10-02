import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    aboutMe: {
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
    },
    jobSeekerEducation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationShema'
    },

});

export const jobSeekerModel = mongoose.model('jobSeekers', jobSchema);