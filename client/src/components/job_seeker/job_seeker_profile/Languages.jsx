import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerLanguageMutation, useDeleteJobSeekerLanguageMutation, useGetCurrentJobSeekerLanguageQuery, useUpdateJobSeekerLanguageMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_language_slice.js";
const Languages = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobSeekerLanguage] = useAddJobSeekerLanguageMutation();
	const [updateJobSeekerLanguage] = useUpdateJobSeekerLanguageMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: language_data = {} } = useGetCurrentJobSeekerLanguageQuery();
	const [deleteJobSeekerLanguage] = useDeleteJobSeekerLanguageMutation()
	const initialValues = {
		language: update_res_state?.language || ''
	}
	const validationSchema = Yup.object({
		language: Yup.string().required('Enter Your  Language')
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { language } = values
				await addJobSeekerLanguage({ language })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { language } = values
				await updateJobSeekerLanguage ({ id : id , updateLanguage : {language} }).then(res => {
					navigate('/Job_seeker_manage_profile')
					setShowForm(!showForm)
					console.log('res',res);
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
				await deleteJobSeekerLanguage(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const languagesComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				language_data?.get_language?.map(res => {
					return (
						<div className="flex flex-row justify-between gap-4 items-center" key={res?._id}>
							<p className=" text-lg tracking-tighter">{res?.language}</p>
							<div className=" space-y-2 lg:space-y-0 lg:space-x-2">
								<Link to={`/Job_seeker_manage_profile/${res?._id}`} state={res}><MdEdit size={25} className=" inline text-blue-500 cursor-pointer" /></Link>
								<MdDeleteOutline onClick={() => handleDelete(res?._id)} size={25} className=" inline text-blue-500 cursor-pointer" />
							</div>
						</div>
					)
				})
			}
		</div>
	)
	return (
		<div className="mt-5 w-full bg-white shadow rounded p-4">
			<h1 className="w-full text-lg tracking-tighter capitalize"> Languages</h1>
			{
				languagesComponent
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-2">
							<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Languages' name="language" />
							<ErrorMessage component='div' className="text-red-500" name="language" />
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close languages</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add languages</small></span>
				}
			</div>

		</div>
	)
}

export default Languages 