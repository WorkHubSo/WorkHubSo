import mongoose from "mongoose";
const certificateSchema = mongoose.Schema({
    certificateName: {
        type: String,
        required: false
    },
    institution: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    expireDate: {
        type: Date,
        required: false
    },
    certificateImage: {
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

export const CertificateModel = mongoose.model('certificateSchema ', certificateSchema)