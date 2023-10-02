import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerCertificateMutation, useDeleteJobSeekerCertificateMutation, useGetCurrentJobSeekerCertificatesQuery, useUpdateJobSeekerCertificateMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_certificates.js";
const Certificates = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobSeekerCertificate] = useAddJobSeekerCertificateMutation();
	const [updateJobSeekerCertificate] = useUpdateJobSeekerCertificateMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: certificate_data = {} } = useGetCurrentJobSeekerCertificatesQuery();
	const [deleteJobSeekerCertificate] = useDeleteJobSeekerCertificateMutation()
	const initialValues = {
		certificateName: update_res_state?.certificateName || '',
		institution: update_res_state?.institution || '',
		startDate: update_res_state?.startDate || '',
		expireDate: update_res_state?.expireDate || '',
		certificateImage: update_res_state?.certificateImage || '',
		description: update_res_state?.description || '',
	}
	const validationSchema = Yup.object({
		certificateName: Yup.string().required('Enter Your  Certificate Name '),
		institution: Yup.string().required('Enter Your Institution '),
		startDate: Yup.date().required('Enter Your Start Date '),
		expireDate: Yup.date().required('Enter Your Expire Date '),
		description: Yup.string().required('Enter Your Description '),
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { certificateName, institution, startDate, expireDate, description } = values
				await addJobSeekerCertificate({ certificateName, institution, startDate, expireDate, description })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { certificateName, institution, startDate, expireDate, description } = values
				await updateJobSeekerCertificate({ id: id, updateCertificate: { certificateName, institution, startDate, expireDate, description } }).then(res => {
					console.log('res', res);
					navigate('/Job_seeker_manage_profile')
					setShowForm(!showForm)
				})
			} catch (error) {
				console.log('error', error);
			}
		}

		resetForm();
	}


	const handleDelete = async (id) => {
		try {
			if (confirm('Are you sure you want to delete')) {
				await deleteJobSeekerCertificate(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const certificateComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				certificate_data?.get_certificate?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.certificateName}</p>
										<p className=" text-lg tracking-tighter">{res?.institution}</p></div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.startDate?.substring(0, 10)} <span className="ml-2 text-lg"> - </span></p>
										<p className=" text-lg tracking-tighter">{res?.expireDate?.substring(0, 10)}</p>
									</div>
									<p className=" text-lg tracking-tighter">{res?.description}</p>
								</div>

								<div className="flex flex-row justify-start items-center space-y-2 lg:space-y-0 lg:space-x-2">
									<Link to={`/Job_seeker_manage_profile/${res?._id}`} state={res}><MdEdit size={25} className=" inline text-blue-500 cursor-pointer" /></Link>
									<MdDeleteOutline onClick={() => handleDelete(res?._id)} size={25} className=" inline text-blue-500 cursor-pointer" />
								</div>

							</div>
							{/* <img className="" src={`../../../../public/uploads/${res?.certificateImage}`} alt="" /> */}
							<hr className="w-full mt-5" />

						</div>
					)
				})
			}
		</div>
	)
	return (
		<div className="mt-5 w-full bg-white shadow rounded p-4">
			<h1 className="w-full text-lg tracking-tighter capitalize"> Certificates</h1>
			{
				certificateComponent
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-2">
							<div className="w-full gap-3 grid grid-cols-1 lg:grid-cols-2 justify-start items-start space-y-1">
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your CertificateName' name="certificateName" />
									<ErrorMessage component='div' className="text-red-500" name="certificateName" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Institution' name="institution" />
									<ErrorMessage component='div' className="text-red-500" name="institution" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your StartDate' name="startDate" />
									<ErrorMessage component='div' className="text-red-500" name="startDate" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your ExpireDate' name="expireDate" />
									<ErrorMessage component='div' className="text-red-500" name="expireDate" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Description' name="description" />
									<ErrorMessage component='div' className="text-red-500" name="description" />
								</div>
							</div>
							<input type="file" className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder="upload certificate image" />
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Certificate</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Certificate</small></span>
				}
			</div>

		</div>
	)
}

export default Certificates