import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerReferenceMutation, useDeleteJobSeekerReferenceMutation, useGetCurrentJobSeekerReferencesQuery, useUpdateJobSeekerReferenceMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_references.js";
const References = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [ addJobSeekerReference ] = useAddJobSeekerReferenceMutation();
	const [ updateJobSeekerReference ] = useUpdateJobSeekerReferenceMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: reference_data = {} } = useGetCurrentJobSeekerReferencesQuery();
	const [deleteJobSeekerReference] = useDeleteJobSeekerReferenceMutation()
	const initialValues = {

		fullName:update_res_state?.fullName || '',
		company: update_res_state?.company || '',
		position:update_res_state?.position || '',
		email: update_res_state?.email || '',
		phone: update_res_state?.phone || '',
		description: update_res_state?.description || '',

	}
	const validationSchema = Yup.object({
		fullName: Yup.string().required('Enter Full Name'),
		company: Yup.string().required('Enter Company '),
		position: Yup.string().required('Enter  Position  '),
		email: Yup.string().required('Enter Email'),
		phone: Yup.number().required('Enter Phone'),
		description: Yup.string().required('Enter Description '),
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { fullName, company, position, email, phone, description } = values
				await addJobSeekerReference({ fullName, company, position, email, phone, description })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { fullName, company, position, email, phone, description } = values
				await updateJobSeekerReference({ id: id, updateReference: { fullName, company, position, email, phone, description } }).then(res => {
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
				await deleteJobSeekerReference(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const referenceComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				reference_data?.reference?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.fullName},</p>
										<p className=" text-lg tracking-tighter">{res?.company}</p></div>
									<div className="flex flex-col lg:flex-row justify-start items-start gap-4">
										<p className=" text-lg tracking-tighter">{res?.position},</p>
										<p className=" text-lg tracking-tighter">{res?.email},</p>
										<p className=" text-lg tracking-tighter">{res?.phone}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> References </h1>
			{
				referenceComponent
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
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Reference Person' name="fullName"/>
									<ErrorMessage component='div' className="text-red-500" name="fullName" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Company Name' name="company" />
									<ErrorMessage component='div' className="text-red-500" name="company" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Position' name="position" />
									<ErrorMessage component='div' className="text-red-500" name="position" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Email Reference Person' name="email" />
									<ErrorMessage component='div' className="text-red-500" name="email" />
								</div>
							</div>
							<div className="w-full space-y-1">
									<Field type='number' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Phone Reference Person ' name="phone" />
									<ErrorMessage component='div' className="text-red-500" name="phone" />
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
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Reference</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Reference</small></span>
				}
			</div>

		</div>
	)
}

export default References