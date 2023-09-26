import mongoose from "mongoose";

const categoryShema = mongoose.Schema({
    category: {
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
export const categoryModel = mongoose.model('categoryShema', categoryShema)