import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerExperienceMutation, useDeleteJobSeekerExperienceMutation, useGetCurrentJobSeekerExperiencesQuery, useUpdateJobSeekerExperienceMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_experiences.js";
import { toast } from "react-toastify";
const Experiences = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobSeekerExperience] = useAddJobSeekerExperienceMutation();
	const [updateJobSeekerExperience] = useUpdateJobSeekerExperienceMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: experience_data = {} } = useGetCurrentJobSeekerExperiencesQuery();
	const [deleteJobSeekerExperience] = useDeleteJobSeekerExperienceMutation()
	const initialValues = {

		jobTitle: update_res_state?.jobTitle || '',
		category: update_res_state?.category || '',
		employeType: update_res_state?.employeType || '',
		companyName: update_res_state?.companyName || '',
		locations: update_res_state?.locations || '',
		years: update_res_state?.years || '',
		description: update_res_state?.description || '',
	}
	const validationSchema = Yup.object({
		jobTitle: Yup.string().required('Enter Job Title '),
		category: Yup.string().required('Enter Category'),
		employeType: Yup.string().required('Enter Employe Type '),
		companyName: Yup.string().required('Enter Company Name'),
		locations: Yup.string().required('Enter Location'),
		years: Yup.date().required('Enter Years'),
		description: Yup.string().required('Enter Description '),
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { jobTitle, category, employeType, companyName, locations, years, description } = values
				await addJobSeekerExperience({ jobTitle, category, employeType, companyName, locations, years, description }).then((res) => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message);
						setShowForm(!showForm)
					} else {
						toast.error(res.data.message);
					}
				})
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { jobTitle, category, employeType, companyName, locations, years, description } = values
				await updateJobSeekerExperience({ id: id, UpdateExperience: { jobTitle, category, employeType, companyName, locations, years, description } }).then(res => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message);
						navigate('/Job_seeker_manage_profile')
						setShowForm(!showForm)
					} else {
						toast.error(res.data.message);
					}
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
				await deleteJobSeekerExperience(id).then((res) => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message);
					} else {
						toast.error(res.data.message);
					}
				})
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const experienceComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				experience_data?.get_experiences?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.jobTitle},</p>
										<p className=" text-lg tracking-tighter">{res?.category}</p></div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.employeType},</p>
										<p className=" text-lg tracking-tighter">{res?.companyName}</p>
									</div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.locations},</p>
										<p className=" text-lg tracking-tighter">{res?.years}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Experiences </h1>
			{
				experienceComponent
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-1">
							<div className="w-full gap-3 grid grid-cols-1 lg:grid-cols-2 justify-start items-start">
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Job Title' name="jobTitle" />
									<ErrorMessage component='div' className="text-red-500" name="jobTitle" />
								</div>
								<div className="w-full space-y-1">
									<Field as='select' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Category' name="category">
										<option value="">-select category--</option>
										<option value="Technology and IT">Technology and IT</option>
										<option value="Finance and Accounting">Finance and Accounting</option>
										<option value="Healthcare and Medicine">Healthcare and Medicine</option>
										<option value="Sales and Marketing">Sales and Marketing</option>
										<option value="Education and Teaching">Education and Teaching</option>
										<option value="Creative Arts and Design">Creative Arts and Design</option>
										<option value="Administrative and Clerical">Administrative and Clerical</option>
										<option value="Human Resources">Human Resources</option>
										<option value="Hospitality and Tourism">Hospitality and Tourism</option>
									</Field>
									<ErrorMessage component='div' className="text-red-500" name="category" />
								</div>
								<div className="w-full space-y-1">
									<Field as='select' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Employe Type' name="employeType">
										<option value=" "> --select employe type -- </option>
										<option value="Full Time">Full Time</option>
										<option value="Part Time">Part Time</option>
										<option value="Internship">Internship</option>
										<option value="Freelance">Freelance</option>
									</Field>
									<ErrorMessage component='div' className="text-red-500" name="employeType" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Company Name' name="companyName" />
									<ErrorMessage component='div' className="text-red-500" name="companyName" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter locations ' name="locations" />
									<ErrorMessage component='div' className="text-red-500" name="locations" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Years ' name="years" />
									<ErrorMessage component='div' className="text-red-500" name="years" />
								</div>
							</div>

							<div className="w-full space-y-1">
								<Field as='textarea' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Description' name="description" />
								<ErrorMessage component='div' className="text-red-500" name="description" />
							</div>
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Experience</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Experience</small></span>
				}
			</div>

		</div>
	)
}

export default Experiences