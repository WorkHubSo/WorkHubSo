import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerEducationMutation, useDeleteJobSeekerEducationMutation, useGetCurrentJobSeekerEducationQuery, useUpdateJobSeekerEducationMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_education.js";
import { toast } from "react-toastify";
const Educations = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobSeekerEducation] = useAddJobSeekerEducationMutation();
	const [updateJobSeekerEducation] = useUpdateJobSeekerEducationMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: educations_data = {} } = useGetCurrentJobSeekerEducationQuery();
	const [deleteJobSeekerEducation] = useDeleteJobSeekerEducationMutation()
	const initialValues = {

		degree: update_res_state?.degree || '',
		institution: update_res_state?.institution || '',
		graduationDate: update_res_state?.graduationDate || '',
		honor: update_res_state?.honor || '',
		gba: update_res_state?.gba || '',
		description: update_res_state?.description || '',
	}
	const validationSchema = Yup.object({
		degree: Yup.string().required('Enter Your   Degree '),
		institution: Yup.string().required('Enter Your Institution '),
		graduationDate: Yup.date().required('Enter Your Graduation Date  '),
		honor: Yup.string().required('Enter Your Honors'),
		gba: Yup.string().required('Enter Your GBA'),
		description: Yup.string().required('Enter Your Description '),
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { degree, institution, graduationDate, honor, gba ,description } = values
				await addJobSeekerEducation({ degree, institution, graduationDate, honor, gba ,description }).then((res)=>{
					const status = res.data.status;
					if(status){
						toast.success(res.data.message);
						setShowForm(!showForm)
					}else{
						toast.error(res.data.message);
					}
				})
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { degree, institution, graduationDate, honor, gba ,description } = values
				await updateJobSeekerEducation({ id: id, updateEducation: { degree, institution, graduationDate, honor, gba ,description } }).then(res => {
					const status = res.data.status;
					if(status){
						toast.success(res.data.message);
						navigate('/Job_seeker_manage_profile')
						setShowForm(!showForm)
					}else{
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
				await deleteJobSeekerEducation(id).then((res)=>{
					const status = res.data.status;
					if(status){
						toast.success(res.data.message);
					}else{
						toast.error(res.data.message);
					}
				})
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const educationComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				educations_data?.get_educations?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.degree},</p>
										<p className=" text-lg tracking-tighter">{res?.institution}</p></div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.graduationDate?.substring(0, 10)},</p>
										<p className=" text-lg tracking-tighter">{res?.honor}</p>
									</div>
									<p className=" text-lg tracking-tighter">GPA :  {res?.gba}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Educations</h1>
			{
				educationComponent
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
									<Field as='select' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Degree' name="degree">
										<option value=" ">--Select Degree level--</option>
										<option value="Bachelor Degree">Master Degree</option>
										<option value="Bachelor Degree">Bachelor Degree</option>
										<option value="Higher Diploma">Higher Diploma</option>
										<option value="Diploma">Diploma</option>
										<option value="Secondary School">Secondary School</option>
										<option value="Primary School">Primary School</option>
									</Field>
									<ErrorMessage component='div' className="text-red-500" name="degree" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Institution' name="institution" />
									<ErrorMessage component='div' className="text-red-500" name="institution" />
								</div>
								<div className="w-full space-y-1">
									<Field type='date' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Graduation Date' name="graduationDate" />
									<ErrorMessage component='div' className="text-red-500" name="graduationDate" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Honor' name="honor" />
									<ErrorMessage component='div' className="text-red-500" name="honor" />
								</div>
							</div>
							<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your GBA ' name="gba" />
									<ErrorMessage component='div' className="text-red-500" name="gba" />
								</div>
							<div className="w-full space-y-1">
									<Field as='textarea' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Description' name="description" />
									<ErrorMessage component='div' className="text-red-500" name="description" />
							</div>
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Education</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Education</small></span>
				}
			</div>

		</div>
	)
}

export default Educations