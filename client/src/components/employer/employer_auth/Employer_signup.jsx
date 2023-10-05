import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Footer, Header } from '../../../index'
import { useRegisterEmployerAuthMutation } from '../../../redux/employer_redux/slices/Employer_auth_slice'
const Employer_signup = () => {
	const [showPassword, setShowPassword] = useState('password')
	const [ registerEmployerAuth ] = useRegisterEmployerAuthMutation()
	const navigate = useNavigate();
	const initialValues = {
		companyName: '',
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		companyName: Yup.string().required('Enter Company Name'),
		email: Yup.string().required('Enter Email'),
		password: Yup.string().required('Enter Password')
			.matches(/[0-9]/, "password at least one number is required")
			.matches(/[a-z]/, "password at least one small letter is required")
			.matches(/[A-Z]/, "password at least one capital letter is required")
			.min(8, "password minimum length is 8")
	})
	const onSubmit = async (values) => {
		try {
			const { companyName, email, password } = values
			await registerEmployerAuth({
				companyName, email, password
			}).then((res) => {
				navigate('/Employer_signin')
				toast.success(res.data.message)
		})
		} catch (error) {
			console.log('error', error.data.message);
		}
	}
	return (
		<>
		<Header/>
			<div className="w-[90%] md:w-[80%] mx-auto mt-32 p-4">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}>
					<Form className='w-full md:w-[45%] bg-white rounded-md shadow-md p-4 mx-auto flex flex-col justify-start items-start gap-2 space-y-5'>
						<h1 className='w-full text-center text-lg md:text-2xl tracking-widest text-[#007bff]'> Register as Employer</h1>
						<Field className=' w-full p-3 border-2 border-[#f5f5f5] rounded outline-[#007bff]' type='text' placeholder='Enter Full Name ' name='companyName' />
						<ErrorMessage component='div' className=' text-red-500' name='companyName' />
						<Field className=' w-full p-3 border-2 border-[#f5f5f5] rounded outline-[#007bff]' type='text' placeholder='Enter Your Email' name='email' />
						<ErrorMessage component='div' className=' text-red-500' name='email' />
						<div className='w-full relative space-y-2'>
							<Field className=' w-full p-3 border-2 border-[#f5f5f5] rounded outline-[#007bff]' type={showPassword} placeholder='Enter Your Password' name='password' />
							<ErrorMessage component='div' className=' text-red-500' name='password' />
							{
								showPassword == 'password' ? <BiHide size={25} className=' absolute right-3  cursor-pointer top-2' onClick={() => setShowPassword('text')} /> :
									<BiShow size={25} className=' cursor-pointer absolute right-3 top-2' onClick={() => setShowPassword('password')} />
							}
						</div>
						<button type='submit' className='w-full p-3 rounded text-white bg-[#007bff] hover:bg-blue-700 '> Sign Up</button>
						<p className=' text-base tracking-widest'>Already have an Account? <Link className=' text-[#007bff]' to='/Employer_signin'> Sign In</Link></p>
					</Form>
				</Formik>
			</div>
			<Footer/>
		</>
	)
}

export default Employer_signup