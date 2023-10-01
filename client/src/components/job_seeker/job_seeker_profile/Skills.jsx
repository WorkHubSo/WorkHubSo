import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerSkillsMutation, useDeleteJobSeekerSkillsMutation, useGetCurrentJobSeekerSkillsQuery, useUpdateJobSeekerSkillsMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_skills.js";
const Skills = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [addJobSeekerSkills] = useAddJobSeekerSkillsMutation();
	const [updateJobSeekerSkills] = useUpdateJobSeekerSkillsMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: skill_data = {} } = useGetCurrentJobSeekerSkillsQuery();
	const [deleteJobSeekerSkills] = useDeleteJobSeekerSkillsMutation()
	const initialValues = {
		skill: update_res_state?.skill || ''
	}
	const validationSchema = Yup.object({
		skill: Yup.string().required('Enter Your  Skill')
	})


	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { skill } = values
				await addJobSeekerSkills({ skill })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { skill } = values
				await updateJobSeekerSkills ({ id : id , updateSkill : {skill} }).then(res => {
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
				await deleteJobSeekerSkills(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const skillsComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				skill_data?.get_skills?.map(res => {
					return (
						<div className="flex flex-row justify-between gap-4 items-center" key={res?._id}>
							<p className=" text-lg tracking-tighter">{res?.skill}</p>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Skills</h1>
			{
				skillsComponent
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-2">
							<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter your Skills' name="skill" />
							<ErrorMessage component='div' className="text-red-500" name="skill" />
							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Skill</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Skill</small></span>
				}
			</div>

		</div>
	)
}

export default Skills