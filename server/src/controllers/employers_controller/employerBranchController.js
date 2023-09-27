import { employerBranchModel } from "../../model/schemas/employers/employerBranch.js";

export const add_branch_location = async(req, res) => {
    try {
        const { branch, location } = req.body;
        const employerId = req.employer._id;

        const add_branch = await new employerBranchModel({
            branch: branch,
            location: location,
            employerId: employerId
        });

        await add_branch.save();

        if (!add_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            message: 'successfully added employer brach and location'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_branch_location = async(req, res) => {
    try {

        const { branch, location } = req.body;

        const employerId = req.employer._id;

        const update_branch = await employerBranchModel.updateOne({ _id: req.params.id }, {
            $set: {
                branch: branch,
                location: location,
                employerId: employerId
            }
        });

        if (!update_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            message: 'successfully updated employer brach and location'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_branch_locations = async(req, res) => {
    try {

        const get_branch = await employerBranchModel.find();

        if (!get_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            get_branch
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const get_current_employer_branch_location = async(req, res) => {
    try {

        const employerId = req.employer._id;

        const get_branch = await employerBranchModel.find({ employerId: employerId });

        if (!get_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            get_branch
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_branch_location = async(req, res) => {
    try {

        const get_branch = await employerBranchModel.findOne({ _id: req.params.id });

        if (!get_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            get_branch
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_branch_location = async(req, res) => {
    try {

        const delete_branch = await employerBranchModel.deleteOne({ _id: req.params.id });

        if (!delete_branch) {
            return res.status(404).json({
                status: false,
                message: 'something went wrong try again'
            })
        }

        res.json({
            message: 'successfully deleted branch and location'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}