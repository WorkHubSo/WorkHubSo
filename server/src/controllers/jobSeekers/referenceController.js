import { referenceModel } from "../../model/schemas/jobSeekers/jobSeekerReferences.js";

export const add_reference = async(req, res) => {
    try {

        const { fullName, company, position, email, phone, description } = req.body;
        const jobSeekerId = req.jobSeeker._id;
        const reference_person = await new referenceModel({
            fullName: fullName,
            company: company,
            position: position,
            email: email,
            phone: phone,
            description: description,
            jobSeekerId: jobSeekerId
        })

        await reference_person.save();

        if (!reference_person) {
            res.status(404).json({
                status: false,
                message: 'Some thing is wrong please try again'
            })
        }

        console.log('what is ', req.jobSeeker);
        res.json({
            status: true,
            message: 'successfully added reference person',
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_references = async(req, res) => {
    try {

        const reference = await referenceModel.find();
        if (!reference) {
            return res.status(404).json({
                message: 'Not Found Any Reference',
            })
        }

        res.json({
            reference
        });

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_current_references = async(req, res) => {
    try {

        const reference = await referenceModel.find({ jobSeekerId: req.jobSeeker._id });
        if (!reference) {
            return res.status(404).json({
                message: 'Not Found Any Reference',
            })
        }

        res.json({
            reference
        });

    } catch (error) {
        console.log('error', error.message);
    }
}

export const update_reference = async(req, res) => {
    try {

        const { fullName, company, position, email, phone, description } = req.body;
        const jobSeekerId = req.jobSeeker._id;

        const update_reference = await referenceModel.updateOne({ _id: req.params.id }, {
            $set: {

                fullName: fullName,
                company: company,
                position: position,
                email: email,
                phone: phone,
                description: description,
                jobSeekerId: jobSeekerId

            }
        })

        if (!update_reference) {

            return res.status(404).json({
                status: false,
                message: 'reference does not exists'
            })

        }

        res.json({
            status: true,
            message: 'successfully updated reference'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const delete_reference = async(req, res) => {
    try {

        const delete_reference = await referenceModel.deleteOne({ _id: req.params.id })
        if (!delete_reference) {
            return res.status(404).json({
                status: false,
                message: 'reference does not exists'
            })
        }

        res.json({
            status: true,
            message: 'successfully deleted reference'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_reference_byId = async(req, res) => {
    try {

        const get_reference = await referenceModel.findOne({ _id: req.params.id })
        if (!get_reference) {
            return res.status(404).json({
                status: false,
                message: 'reference does not exists'
            })
        }

        res.json({
            get_reference
        })

    } catch (error) {
        console.log('error', error.message);
    }
}