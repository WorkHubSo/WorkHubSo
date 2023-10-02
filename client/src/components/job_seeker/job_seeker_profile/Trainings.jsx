import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerTrainingMutation, useDeleteJobSeekerTrainingMutation, useGetCurrentJobSeekerTrainingsQuery, useUpdateJobSeekerTrainingMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_trainings.js";
const Trainings = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [ addJobSeekerTraining ] = useAddJobSeekerTrainingMutation();
	const [updateJobSeekerTraining] = useUpdateJobSeekerTrainingMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: training_data = {} } = useGetCurrentJobSeekerTrainingsQuery();
	const [deleteJobSeekerTraining] = useDeleteJobSeekerTrainingMutation()
	const initialValues = {

		topic: update_res_state?.topic || '',
		institution: update_res_state?.institution || '',
		startDate: update_res_state?.startDate || '',
		endDate: update_res_state?.endDate || '',
		description: update_res_state?.description || '',
	}
	const validationSchema = Yup.object({
		topic: Yup.string().required('Enter Topic '),
		institution: Yup.string().required('Enter Institution '),
		startDate: Yup.date().required('Enter  Start Date '),
		endDate: Yup.date().required('Enter  End Date '),
		description: Yup.string().required('Enter Your Description '),
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { topic, institution, startDate, endDate, description } = values
				await addJobSeekerTraining({ topic, institution, startDate, endDate, description })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { topic, institution, startDate, endDate, description } = values
				await updateJobSeekerTraining({ id: id, updateTraining: { topic, institution, startDate, endDate, description} }).then(res => {
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
				await deleteJobSeekerTraining(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const trainingComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				training_data?.get_trainings?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.topic},</p>
										<p className=" text-lg tracking-tighter">{res?.institution}</p></div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.startDate?.substring(0, 10)} <span className="ml-2 text-lg"> - </span></p>
										<p className=" text-lg tracking-tighter">{res?.endDate?.substring(0, 10)}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Trainings </h1>
			{
				trainingComponent
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
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Topic' name="topic" />
									<ErrorMessage component='div' className="text-red-500" name="topic" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Institution' name="institution" />
									<ErrorMessage component='div' className="text-red-500" name="institution" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Start Date' name="startDate" />
									<ErrorMessage component='div' className="text-red-500" name="startDate" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter End Date' name="endDate" />
									<ErrorMessage component='div' className="text-red-500" name="endDate" />
								</div>
								<div className="w-full space-y-1">
									<Field as='textarea' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Description' name="description" />
									<ErrorMessage component='div' className="text-red-500" name="description" />
								</div>
							</div>
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Training</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Training</small></span>
				}
			</div>

		</div>
	)
}

export default Trainings