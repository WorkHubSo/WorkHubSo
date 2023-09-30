import mongoose from "mongoose";
import { categoryModel } from "../../model/schemas/jobSeekers/jobSeekersCategory.js";

export const add_category = async(req, res) => {
    try {
        const { category } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const add_category = await new categoryModel({
            category: category,
            jobSeekerId: jobSeekerId
        })

        await add_category.save();

        if (!add_category) {
            return res.json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully added category '
        })

    } catch (error) {
        console.log('error', error.message, jobSeekerId);
    }
}

export const update_category = async(req, res) => {
    try {

        const { category } = req.body;

        const update_catogory = await categoryModel.updateOne({ _id: req.params.id }, {
            $set: {
                category: category
            }
        });


        if (!update_catogory) {
            return res.json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully update category'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const delete_category = async(req, res) => {
    try {
        const delete_category = await categoryModel.deleteOne({
            _id: req.params.id,
        })

        if (!delete_category) {
            return res.json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            status: true,
            message: 'successfully deleted category'
        })
    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_category_byId = async(req, res) => {
    try {
        const get_category = await categoryModel.findOne({
            _id: req.params.id,
        })

        if (!get_category) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_category
        })
    } catch (error) {
        console.log('error', error.message);
    }
}





export const get_category = async(req, res) => {
    try {
        const get_category = await categoryModel.find({
            jobSeekerId: req.jobSeeker._id,
        })

        if (!get_category) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_category
        })
    } catch (error) {
        console.log('error', error.message);
    }
}
export const get_categories = async(req, res) => {
    try {
        const get_category = await categoryModel.find()

        if (!get_category) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong please try again'
            })
        }

        res.json({
            get_category
        })
    } catch (error) {
        console.log('error', error.message);
    }
}