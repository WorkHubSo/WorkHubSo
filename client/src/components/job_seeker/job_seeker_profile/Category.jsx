import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { MdDeleteOutline, MdEdit, MdOutlineAdd, MdOutlineClear } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { useAddJobseekerCategoryMutation, useDeleteJobSeekerCategoryMutation, useGetJobSeekerCategoryQuery, useUpdateJobSeekerCategoryMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_category";
const Category = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobseekerCategory] = useAddJobseekerCategoryMutation();
	const [updateJobSeekerCategory] = useUpdateJobSeekerCategoryMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: Category_data = {} } = useGetJobSeekerCategoryQuery();
	const [deleteJobSeekerCategory] = useDeleteJobSeekerCategoryMutation()
	console.log('data', Category_data)
	const initialValues = {
		category: update_res_state?.category || ''
	}
	const validationSchema = Yup.object({
		category: Yup.string().required('Enter Category Your Prefered')
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { category } = values
				await addJobseekerCategory({ category }).then((res) => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message)

					} else {
						toast.error(res.data.message)
					}
				})

			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { category } = values
				await updateJobSeekerCategory({ id: id, updateCategory: { category } }).then((res) => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message)
						setShowForm(!showForm)
						navigate('/Job_seeker_manage_profile')
					

					} else {
						toast.error(res.data.message)
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
				await deleteJobSeekerCategory(id).then((res) => {
					const status = res.data.status;
					if (status) {
						toast.success(res.data.message)
					} else {
						toast.error(res.data.message)
					}
				})
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const CategoryData = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				Category_data?.get_category?.map(res => {
					return (
						<div className="flex flex-row justify-between gap-4 items-center" key={res?._id}>
							<p className=" text-lg tracking-tighter">{res?.category}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Category</h1>
			{
				CategoryData
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-2">
							<Field as='select' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Category like Web developer' name="category">
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
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Category</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Category</small></span>
				}
			</div>

		</div>
	)
}

export default Category