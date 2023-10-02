import { Field, Form, Formik } from "formik"
import { useState } from "react";
import { MdOutlineClear, MdOutlineAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAddJobSeekerSocialLinksMutation, useDeleteJobSeekerSocialLinksMutation, useGetCurrentJobSeekerSocialLinkQuery, useUpdateJobSeekerSocialLinksMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_social_links.js";
import { BsTwitter , BsLinkedin , BsGithub , BsFacebook, BsYoutube , } from 'react-icons/bs'
import { SiLinktree } from 'react-icons/si'
const Social_links = ({ update_res_state }) => {
	const navigate = useNavigate();
	const [ addJobSeekerSocialLinks ] = useAddJobSeekerSocialLinksMutation();
	const [ updateJobSeekerSocialLinks ] = useUpdateJobSeekerSocialLinksMutation();
	const [showForm, setShowForm] = useState(false)
	const { data: reference_data = {} } = useGetCurrentJobSeekerSocialLinkQuery();
	const [deleteJobSeekerSocialLinks] = useDeleteJobSeekerSocialLinksMutation()
	const initialValues = {
		linkedIn:update_res_state?.linkedIn || '',
		facebook:update_res_state?.facebook || '',
		twitter:update_res_state?.twitter || '',
		github: update_res_state?.github || '',
		linkTree:update_res_state?.linkTree || '',
		Youtube: update_res_state?.Youtube || ''

	}

	const onSubmit = async (values, { resetForm }) => {
		const id = update_res_state?._id;
		if (!id) {
			try {
				const { linkedIn , facebook , twitter , github , linkTree , Youtube } = values
				await addJobSeekerSocialLinks({ linkedIn , facebook , twitter , github , linkTree , Youtube })
			} catch (error) {
				console.log('error', error);
			}
		} else {
			try {
				const { linkedIn , facebook , twitter , github , linkTree , Youtube } = values
				await updateJobSeekerSocialLinks({ id: id, updateSocialLinks: { linkedIn , facebook , twitter , github , linkTree , Youtube } }).then(res => {
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
				await deleteJobSeekerSocialLinks(id)
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	const socialLinksComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			{
				reference_data?.get_social_links?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-row justify-start items-start gap-4">
										<Link target="_blank" to={`https://www.linkedin.com/in/${res?.linkedIn}/`}><BsLinkedin size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://www.facebook.com/${res?.facebook}`}><BsFacebook size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://twitter.com/${res?.twitter}`}><BsTwitter size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://github.com/${res?.github}`}><BsGithub size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://linktr.ee/${res?.linkTree}`}><SiLinktree size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://www.youtube.com/@${res?.Youtube}`}><BsYoutube size={25} className=" inline text-blue-500"/></Link>
									</div>
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
			<h1 className="w-full text-lg tracking-tighter capitalize"> Social Links </h1>
			{
				socialLinksComponent
			}
			<div className="mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					onSubmit={onSubmit}>
					{
						showForm ? <Form className="flex flex-col text-[#333333] justify-start items-start gap-2 space-y-1">
							<div className="w-full gap-3 grid grid-cols-1 lg:grid-cols-2 justify-start items-start">
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='linkedIn/in/@miirshe' name="linkedIn"/>
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='facebook/@miirshe' name="facebook" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='twitter/@miirshe' name="twitter" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='github/@miirshe' name="github" />
								</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='linkTree/@miirshe' name="linkTree" />
							</div>
								<div className="w-full space-y-1">
									<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Youtube/user/@miirshe' name="Youtube" />
							</div>
							</div>

							<button type="submit" className="py-2 px-10 rounded shadow hover:bg-blue-600 bg-[#007bff] text-white">Save</button>
						</Form> : ''
					}
				</Formik>
			</div>

			<div className="w-full mt-5">
				{
					showForm ? <span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow">< MdOutlineClear size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Close Social Link</small></span> :
						<span className=" cursor-pointer bg-[#007bff] text-white py-2 px-5 rounded shadow"><MdOutlineAdd size={20} className="inline" onClick={() => setShowForm(!showForm)} /> <small className=" tracking-tighter text-lg" onClick={() => setShowForm(!showForm)} > Add Social Link</small></span>
				}
			</div>

		</div>
	)
}

export default Social_links