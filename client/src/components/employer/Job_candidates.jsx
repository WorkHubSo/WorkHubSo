import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { BiStats } from "react-icons/bi"
import { GrResume } from "react-icons/gr"
import { MdModeEditOutline } from "react-icons/md"
import { TiDelete } from "react-icons/ti"
import Modal from 'react-modal';
import { useUpdateJobCandidateMutation } from "../../redux/employer_redux/slices/JobCandidates";
import { toast } from "react-toastify";
import { useState } from "react";
Modal.setAppElement('#root')

const Job_candidates = ({ handleDelete, get_job_candidates }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [getId , setId ] = useState('');
	const handleShow = (id) => {
		setShow(true);
		setId(id);
	}
	const [updateJobCandidate] = useUpdateJobCandidateMutation();
	const initialValues = {
		jobOfferStatus: ''
	}
	const validationSchema = Yup.object({
		jobOfferStatus: Yup.string().required('Job offer status'),
	})
	console.log('getId',getId);
	const handleSubmit = async (values, { resetForm }) => {
		try {
			const { jobOfferStatus } = values;
			console.log('id : ', getId , 'values : ',values);
			await updateJobCandidate({ id: getId, updateCandidate: {jobOfferStatus}  })
				.then(res => {
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
		resetForm()
	}
	return (
		<div className="w-full p-5 bg-white shadow-md rounded-md mt-5">
			<h1 className=" text-lg tracking-widest text-[#007bff]">Job Candidates</h1>
			<div className="mt-10 p-1 w-full grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4 space-y-4">
				{
					get_job_candidates?.map(res => {
						return (
							<div className="rounded-md shadow-md flex flex-col justify-start items-start p-3 space-y-3
							 hover:bg-[#007bff] hover:text-white transition-all ease-in-out duration-500 cursor-pointer" key={res?._id}>
								<div className="mt-3 flex flex-col md:flex-row justify-start items-center gap-3">
									{res?.jobSeekerImage ? <img className="w-20 h-20 object-center bg-cover rounded-[100%]" src={`../../../public/uploads/${res?.jobSeekerImage}`} alt="" /> : " "}
									{/* <img className="w-10 h-10 rounded-md" src={`../../../public/images/avator.png`}/> */}
									<div>
										<p className=" text-base tracking-tighter">{res?.jobSeekerName}</p>
										<p className=" text-base tracking-tighter">{res?.jobSeekerEmail}</p>
									</div>
								</div>
								<p className=" text-base tracking-tighter">Job Title : {res?.jobTitle}</p>
								<p className=" text-base tracking-tighter">Job Category : {res?.jobCategory}</p>
								<div className="flex flex-col justify-start items-start gap-3">
									<p className="flex flex-row justify-start items-center"><BiStats className="inline" size={20} /> <span className="ml-1">status : {res?.jobOfferStatus}</span></p>
									<p className="flex flex-row justify-start items-center"><GrResume className="inline" size={20} /> <span className="ml-1">Resume : {res?.jobOfferStatus}</span></p>
								</div>
								<div className="w-full flex flex-row justify-end items-start gap-5">
									<TiDelete className=" text-red-500" size={25} onClick={() => handleDelete(res?._id)} />
										<MdModeEditOutline size={25} onClick={() => handleShow(res?._id)} />
								</div>
							</div>
						)
					})
				}
			</div>
			<Modal className='w-[80%] lg:w-[30%] bg-[#f5f5f5] mx-auto p-10 rounded mt-32' isOpen={show} onRequestClose={handleClose} >
				<h1 className="w-full text-xl tracking-widest text-start">Status</h1>
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit} className="mt-4 flex flex-col justify-start items-center gap-2 space-y-5">
					<Form className="mt-10">
						<div className="w-full relative space-y-3">
							<Field className='outline-[#007bff] w-full p-3 rounded shadow' as='select' name="jobOfferStatus">
								<option value="">-select Status--</option>
								<option value="accept">accept</option>
								<option value="reject">reject</option>
								<option value="pending">pending</option>
							</Field>
							<ErrorMessage className="text-red-500" component='div' name="jobOfferStatus" />
						</div>
						<div className="mt-10 flex flex-row justify-center items-start gap-4">
							<button className="text-xl text-white tracking-widest p-3 rounded shadow bg-slate-900 hover:bg-slate-700" onClick={handleClose}>Close</button>
							<button type="submit" className="text-xl text-white tracking-widest p-3 rounded shadow bg-[#007bff] hover:bg-blue-600">Save</button>
						</div>
					</Form>
				</Formik>
			</Modal>
		</div>
	)

}

export default Job_candidates