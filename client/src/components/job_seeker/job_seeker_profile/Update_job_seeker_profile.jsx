import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import axios from 'axios'
import { useGetCurrentJobSeekerQuery, useGetJobSeekersQuery, useUpdateJobSeekerMutation } from "../../../redux/job_seeker_redux/slices/job_seeker_slice";
const Update_job_seeker_profile = () => {
	const [updateJobSeeker] = useUpdateJobSeekerMutation();
	const [errors, setErrors] = useState(false);
	const [message, setMessage] = useState('');
	const [success, setSuccees] = useState(false);
	const { data: user = {} } = useGetCurrentJobSeekerQuery();
	const { data: users = {} } = useGetJobSeekersQuery();
	const jobSeeker = users?.user?.find((res) => {
		return res._id == user?._id
	})
	const [files, setFiles] = useState(null);
	const [selectedFiles, setSelectedFiles] = useState('');
	const initialValues = {
		fullName: jobSeeker?.fullName || '',
		email: jobSeeker?.email || '',
		username: jobSeeker?.username || '',
		gender: jobSeeker?.gender || '',
		phone: jobSeeker?.phone || '',
		address: jobSeeker?.address || '',
		aboutMe: jobSeeker?.aboutMe || '',
	}
	const validationSchema = Yup.object({
		fullName: Yup.string().required('Enter Your Full Name'),
		email: Yup.string().required('Enter Your Email'),
		username: Yup.string().required('Enter Your Username'),
		gender: Yup.string().required('Enter Your gender'),
		phone: Yup.string().required('Enter Your Phone '),
		address: Yup.string().required('Enter Your Address'),
		aboutMe: Yup.string().required('Enter Your Bio'),
	})

	const handleFileChange = (e) => {
		setFiles(e.target.files[0])

		if (files) {
			const setFile = URL.createObjectURL(files)
			setSelectedFiles(setFile);
		}
	}

	const upload = async () => {
		try {

			let formdata = new FormData();
			formdata.append('file', files);
			const res = await axios.post("http://localhost:8000/api/upload", formdata)
			return res.data;

		} catch (error) {
			console.log(`error uploading : ${error.message}`);
		}
	}
	const onSubmit = async (values) => {

		try {
			const { fullName, email, username, gender, phone, address, aboutMe } = values
			const photo = await upload();
			await updateJobSeeker({
				id: jobSeeker?._id,
				UpdateJobSeeker: { fullName, email, username, gender, phone, address, photo, aboutMe }
			}).then((res) => {
				const status = res.data.status;
				if (status) {
					setSuccees(true);
					setErrors(false);
					setMessage(res.data.message)
				} else {
					setSuccees(false);
					setErrors(true);
					setMessage(res.data.message)
				}
			})
		} catch (error) {
			console.log('error', error);
		}
	}
	return (
		<div className="w-full text-[#333333] bg-white shadow rounded p-4">
			<div className="mt-5">
				<h1 className="w-full text-lg tracking-tighter capitalize">Update Profile</h1>
				{errors ? <p className=" text-base mt-2 text-red-500 tracking-tighter">{message}</p> : ''}
				{success ? <p className=" text-base mt-2 text-green-500 tracking-tighter">{message}</p> : ''}
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					<Form className="mt-5 flex flex-col justify-start items-start gap-2 space-y-3">
						<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 justify-start items-start">
							<div className="w-full space-y-1">
								<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Full Name' name="fullName" />
								<ErrorMessage component='div' className="text-red-500" name="fullName" />
							</div>
							<div className="w-full space-y-1">
								<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Email' name="email" />
								<ErrorMessage component='div' className="text-red-500" name="email" />
							</div>
							<div className="w-full space-y-1">
								<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Username' name="username" />
								<ErrorMessage component='div' className="text-red-500" name="username" />
							</div>
							<div className="w-full space-y-1">
								<Field as='select' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Gender' name="gender">
									<option value=" ">--select gender ---</option>
									<option value="male">male</option>
									<option value="female">female</option>
								</Field>
								<ErrorMessage component='div' className="text-red-500" name="gender" />
							</div>
							<div className="w-full space-y-1">
								<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Phone Number' name="phone" />
								<ErrorMessage component='div' className="text-red-500" name="phone" />
							</div>
							<div className="w-full space-y-1">
								<Field type='text' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Address' name="address" />
								<ErrorMessage component='div' className="text-red-500" name="address" />
							</div>
						</div>
						<div className="w-full space-y-1">
							<Field as='textarea' className=' w-full p-3 rounded shadow outline-[#007bff]' placeholder='Enter Your Bio' name="aboutMe" />
							<ErrorMessage component='div' className="text-red-500" name="aboutMe" />
						</div>
						<div className="w-full space-y-1">
							<input type="file" onChange={handleFileChange} />
						</div>
						<button type="submit" className="py-2 px-10 rounded shadow bg-[#007bff] hover:bg-blue-600 text-white">Save</button>
					</Form>
				</Formik>
			</div>

		</div>
	)
}

export default Update_job_seeker_profile