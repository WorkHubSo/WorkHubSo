import { ErrorMessage, Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from 'yup'
import { useChangePasswordMutation, useGetCurrentEmployerAuthQuery } from "../../redux/employer_redux/slices/Employer_auth_slice"
const Change_password = () => {
	const { data : employerInfo = [] } = useGetCurrentEmployerAuthQuery();
	const currentEmployer = employerInfo?.employer || []
	console.log('currentEmployer',currentEmployer);
	const  [changePassword] = useChangePasswordMutation();
	const initialState = {
		currentPassword : currentEmployer?.password || '',
		NewPassword : '',
		ConfirmPassword : ''
	}
	const validationSchema = Yup.object({
		currentPassword : Yup.string().required('Enter Current Password'),
		NewPassword : Yup.string().required('Enter New Password')
		.matches(/[0-9]/, "password at least one number is required")
		.matches(/[a-z]/, "password at least one small letter is required")
		.matches(/[A-Z]/, "password at least one capital letter is required")
		.min(8, "password minimum length is 8"),
		ConfirmPassword : Yup.string().required('Enter Confirm Password'),
	})

	const handleSubmit = async(values , {resetForm}) => {
		const { NewPassword , ConfirmPassword} = values;
		try {
			if(NewPassword === ConfirmPassword){
				await changePassword({ id : currentEmployer?._id ,updatePassword :{ NewPassword }}).then((res) => {
					toast.success(res.data.message)
				})
			}else{
				toast.error('New password and confirm password is not match')
			}
			
		} catch (error) {
			console.log('error', error);
		}
		console.log('NewPassword',NewPassword);
	} 
	return (
		<div className='mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]'>
			<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
				<Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
				<small>/</small>
				<span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Change Password</span>
			</h1>
			<Formik
			initialValues={initialState}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}>
				<Form className="mt-10 p-2 w-full flex flex-col justify-start items-start gap-4 space-y-5">
					<div className="w-full space-y-3">
						<Field className='w-full p-3 rounded shadow outline-[#007bff]' type='password' placeholder='Current Password' name='currentPassword' />
						<ErrorMessage component='div' className="text-red-500" name="currentPassword" />
					</div>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 justify-start items-start gap-2">
						<div className="w-full space-y-3">
							<Field className='w-full p-3 rounded shadow outline-[#007bff]' type='password' placeholder='New Password' name='NewPassword' />
							<ErrorMessage component='div' className="text-red-500" name="NewPassword" />
						</div>
						<div className="w-full space-y-3">
							<Field className='w-full p-3 rounded shadow outline-[#007bff]' type='password' placeholder='Confirm Password' name='ConfirmPassword' />
							<ErrorMessage component='div' className="text-red-500" name="ConfirmPassword" />
						</div>
					</div>
					<button type="submit" className="lg:w-[30%] bg-[#007bff] text-white hover:bg-blue-600 w-full p-3 rounded shadow"> Change Password </button>
				</Form>
			</Formik>
		</div>
	)
}

export default Change_password