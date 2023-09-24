import mongoose, { SchemaType } from 'mongoose'

const educationShema = mongoose.Schema({
    degree: {
        type: String,
        required: false,
    },
    institution: {
        type: String,
        required: false,
    },
    graduationDate: {
        type: Date,
        required: false
    },
    honor: {
        type: String,
        required: false
    },
    gba: {
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

export const educationModel = mongoose.model('educationShema', educationShema)