import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
const Job_seeker_signin = () => {
	const [ showPassword , setShowPassword ] = useState('password')
	const initialValues = {
		email : '',
		password : ''
	}

	const validationSchema = Yup.object({
		email : Yup.string().required('Enter Your Email'),
		password : Yup.string().required('Enter Your Password')
		.matches(/[0-9]/,"password at least one number is required")
		.matches(/[a-z]/,"password at least one small letter is required")
		.matches(/[A-Z]/,"password at least one capital letter is required")
		.min(8,"password minimum length is 8")
	})
  return (
	<div className="w-[80%] mx-auto mt-32 p-4">
		<Formik
		initialValues={initialValues}
		validationSchema={validationSchema}>
			<Form className='w-full md:w-[45%] bg-white rounded-md shadow-md p-4 mx-auto flex flex-col justify-start items-start gap-2 space-y-5'>
				<h1 className='w-full text-center text-lg md:text-2xl tracking-widest text-[#007bff]'> Register as Job Seeker </h1>
				<Field className=' w-full p-3 border-2 border-[#f5f5f5] rounded outline-[#007bff]' type='text' placeholder='Enter Your Email' name='email'/>
				<ErrorMessage component='div' className=' text-red-500' name='email'/>
				<div className='w-full relative space-y-2'>
					<Field className=' w-full p-3 border-2 border-[#f5f5f5] rounded outline-[#007bff]' type={showPassword} placeholder='Enter Your Password' name='password'/>
					<ErrorMessage component='div' className=' text-red-500' name='password'/>
					{
						showPassword == 'password' ? <BiHide size={25} className=' absolute right-3  cursor-pointer top-2' onClick={()=> setShowPassword('text')}/> : 
						<BiShow size={25}  className=' cursor-pointer absolute right-3 top-2' onClick={()=>setShowPassword('password')}/>
					}
				</div>
				<button className='w-full p-3 rounded text-white bg-[#007bff] hover:bg-blue-700'> Sign Up</button>
				<p className=' text-base tracking-widest'> don`t have an Account? <Link className=' text-[#007bff]' to='/Job_seeker_signup'> Sign In</Link></p>
			</Form>
		</Formik>
	</div>
  )
}

export default Job_seeker_signin