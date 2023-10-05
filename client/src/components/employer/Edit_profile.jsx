import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link, useLocation } from "react-router-dom"
import { useGetCurrentEmployerAuthQuery, useGetEmployersAuthQuery, useUpdateEmployerAuthMutation } from "../../redux/employer_redux/slices/Employer_auth_slice"
import * as Yup from 'yup'
import { toast } from "react-toastify"
import { useState } from "react"
import axios from "axios"
const Edit_profile = () => {
	const [updateEmployer] = useUpdateEmployerAuthMutation()
	const { data: currentJobSeeker = {} } = useGetCurrentEmployerAuthQuery();
	const { data: getJobSeekers = [] } = useGetEmployersAuthQuery();
	const jobSeekerId = currentJobSeeker?.employer?._id || [];
	const jobseeker = getJobSeekers?.employer || []
	const jobseekerProfile = jobseeker.find(res => {
		return res._id == jobSeekerId
	})
	const [coverFile, setCoverFile] = useState(null);
	const [logoFile, setLogoFile] = useState(null);
	const uploadCover = async () => {
		try {

			let formdata = new FormData();
			formdata.append('file', coverFile);
			const res = await axios.post("http://localhost:8000/api/upload", formdata)
			return res.data;

		} catch (error) {
			console.log(`error uploading : ${error.message}`);
		}
	}

	const uploadLogo = async () => {
		try {

			let formdata = new FormData();
			formdata.append('file', logoFile);
			const res = await axios.post("http://localhost:8000/api/upload", formdata)
			return res.data;

		} catch (error) {
			console.log(`error uploading : ${error.message}`);
		}
	}

	const initialValues = {
		companyName: jobseekerProfile?.companyName || '',
		email: jobseekerProfile?.email || '',
		phone: jobseekerProfile?.phone || '',
		website: jobseekerProfile?.website || '',
		companyBio: jobseekerProfile?.companyBio || '',
		FoundedIn: jobseekerProfile?.FoundedIn || '',
		industry: jobseekerProfile?.industry || '',
		noEmployee: jobseekerProfile?.noEmployee || '',
		location: jobseekerProfile?.location || '',
		facebook: jobseekerProfile?.facebook || '',
		twitter: jobseekerProfile?.twitter || '',
		instagram: jobseekerProfile?.instagram || '',
		linkedIn: jobseekerProfile?.linkedIn || ''
	}

	const validationSchema = Yup.object({
		companyName: Yup.string().required(' Enter a Company Name '),
		email: Yup.string().required(' Enter a Company Email '),
		phone: Yup.number().required(' Enter a Company Number '),
		companyBio: Yup.string().required(' Enter a Company Bio '),
		industry: Yup.string().required(' Enter a Company Industry'),
		location: Yup.string().required(' Enter a Company location')

	})
	const handleSubmit = async (values) => {
		console.log('values', values);
		const { companyName, email, phone, website, companyBio, FoundedIn, industry, noEmployee, location, facebook, twitter, instagram, linkedIn } = values
		const cover = await uploadCover();
		const logo = await uploadLogo();

		try {
			await updateEmployer({ id: jobseekerProfile?._id, updateEmployer: { companyName, email, phone, website, companyBio, FoundedIn, industry, noEmployee, location, facebook, twitter, instagram, linkedIn, cover, logo } }).then((res) => {
				toast.success(res.data.message)
			})

		} catch (error) {
			console.log('error', error);
		}
	}
	return (
		<div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
			<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
				<Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
				<small>/</small>
				<span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Edit Profile</span>
			</h1>
			<div className="mt-5 w-full  lg:w-[90%] bg-white shadow rounded p-4 ">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					<Form className="w-full flex flex-col justify-start items-start gap-2 space-y-3">
						<div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-4">
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Name' name="companyName" />
								<ErrorMessage className="text-red-500" component='div' name="companyName" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='email' name="email" />
								<ErrorMessage className="text-red-500" component='div' name="email" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='number' placeholder='phone' name="phone" />
								<ErrorMessage className="text-red-500" component='div' name="phone" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='website' name="website" />
								<ErrorMessage className="text-red-500" component='div' name="website" />
							</div>
							<div className="w-full">
								<input className='outline-[#007bff] w-full p-3 rounded shadow' type='file' placeholder='cover photo' onChange={(e) => setCoverFile(e.target.files[0])} />
							</div>
							<div className="w-full">
								<input className='outline-[#007bff] w-full p-3 rounded shadow' type='file' placeholder='logo photo' onChange={(e) => setLogoFile(e.target.files[0])} />
							</div>
						</div>
						<div className="w-full">
							<Field className='outline-[#007bff] w-full p-3 rounded shadow' as='textarea' placeholder='website' name="companyBio" />
							<ErrorMessage className="text-red-500" component='div' name="companyBio" />
						</div>
						<div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-4">
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' as='select' placeholder='industry' name="industry">
									<option value="">select industry</option>
									<option value="Software Engineering">Software Engineering</option>
									<option value="Finance">Finance</option>
									<option value="HealthCare">HealthCare</option>
									<option value="Project Management">Project Management</option>
								</Field>
								<ErrorMessage className="text-red-500" component='div' name="industry" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Founded In' name="FoundedIn" />
								<ErrorMessage className="text-red-500" component='div' name="FoundedIn" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='number' placeholder='Company No Employee' name="noEmployee" />
								<ErrorMessage className="text-red-500" component='div' name="noEmployee" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Location' name="location" />
								<ErrorMessage className="text-red-500" component='div' name="location" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Facebook Social Links' name="facebook" />
								<ErrorMessage className="text-red-500" component='div' name="facebook" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Twitter Social Links' name="twitter" />
								<ErrorMessage className="text-red-500" component='div' name="twitter" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company Instagram Social Links' name="instagram" />
								<ErrorMessage className="text-red-500" component='div' name="instagram" />
							</div>
							<div className="w-full">
								<Field className='outline-[#007bff] w-full p-3 rounded shadow' type='text' placeholder='Company LinkedIn Social Links' name="linkedIn" />
								<ErrorMessage className="text-red-500" component='div' name="linkedIn" />
							</div>
						</div>
						<button type="submit" className="lg:w-[30%] bg-[#007bff] text-white hover:bg-blue-600 w-full p-3 rounded shadow">Edit Profile</button>
					</Form>
				</Formik>
			</div>
		</div>
	)
}

export default Edit_profile