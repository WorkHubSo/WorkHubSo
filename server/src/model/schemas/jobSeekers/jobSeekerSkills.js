import mongoose from "mongoose";

const skillsShema = mongoose.Schema({
    skill: {
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

export const skillsModel = mongoose.model('skillsShema', skillsShema)