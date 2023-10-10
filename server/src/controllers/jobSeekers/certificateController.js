import { CertificateModel } from "../../model/schemas/jobSeekers/jobSeekersCertificates.js";

export const add_certificate = async(req, res) => {
    try {

        const { certificateName, institution, startDate, expireDate, certificateImage, description } = req.body
        const jobSeekerId = req.jobSeeker._id
        const add_certificate = await new CertificateModel({
            certificateName: certificateName,
            institution: institution,
            startDate: startDate,
            expireDate: expireDate,
            certificateImage: certificateImage,
            description: description,
            jobSeekerId: jobSeekerId
        });

        await add_certificate.save();

        if (!add_certificate) {
            return res.status(404).json({
                message: 'something went wrong please try again'
            })
        }
        res.json({
            status: true,
            message: 'successfully added certificate'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}


export const update_certificate = async(req, res) => {
    try {

        const { certificateName, institution, startDate, expireDate, certificateImage, description } = req.body
        const jobSeekerId = req.jobSeeker._id;
        const findCertificate = await CertificateModel.findOne({ _id: req.params.id })
        if (!findCertificate) {
            return res.status(404).json({
                message: 'something went wrong please try again'
            })
        }
        const update_certificate = await CertificateModel.updateOne({ _id: req.params.id }, {
            $set: {

                certificateName: certificateName,
                institution: institution,
                startDate: startDate,
                expireDate: expireDate,
                certificateImage: certificateImage,
                description: description,
                jobSeekerId: jobSeekerId

            }
        });

        if (!update_certificate) {
            return res.status(404).json({
                message: 'something went wrong please try again'
            })
        }
        res.json({
            status: true,
            message: 'successfully updated certificate'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_certificates = async(req, res) => {
    try {

        const get_certificate = await CertificateModel.find();

        if (!get_certificate) {
            return res.status(404).json({
                status: false,
                message: 'Could not find certificate'
            })
        }

        res.json({
            get_certificate
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_current_certificates = async(req, res) => {
    try {

        const get_certificate = await CertificateModel.find({ jobSeekerId: req.jobSeeker._id });

        if (!get_certificate) {
            return res.status(404).json({
                status: false,
                message: 'Could not find certificate'
            })
        }

        res.json({
            get_certificate
        })

    } catch (error) {
        console.log('error', error.message);
    }
}

export const get_certificate_byId = async(req, res) => {
    try {

        const get_certificate = await CertificateModel.findOne({ _id: req.params.id });

        if (!get_certificate) {
            return res.status(404).json({
                status: false,
                message: 'Could not find certificate'
            })
        }

        res.json({
            get_certificate
        })

    } catch (error) {
        console.log('error', error.message);
    }
}



export const delete_certificate = async(req, res) => {
    try {

        const delete_certificate = await CertificateModel.deleteOne({ _id: req.params.id });

        if (!delete_certificate) {
            return res.status(404).json({
                status: false,
                message: 'Could not find certificate'
            })
        }

        res.json({
            status: true,
            message: 'successfully deleted certificate'
        })

    } catch (error) {
        console.log('error', error.message);
    }
}