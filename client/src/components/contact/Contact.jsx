import emailjs from '@emailjs/browser';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { BiWorld } from 'react-icons/bi';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Footer, Header } from '../../index';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const Contact = () => {
	const jobSeekerToken = Cookies.get('jobSeekerToken')
	const employerToken = Cookies.get('employerToken')
	const [ auth , setAuth ] = useState(false);

	useEffect(()=> {
		if(jobSeekerToken || employerToken){
			setAuth(true);
		}else{
			setAuth(false);
		}
	},[])
	const initialValues = {
		name: '',
		email: '',
		subject: '',
		message: ''
	}
	const validationSchema = Yup.object({
		name: Yup.string().required('Name is required'),
		email: Yup.string().required('Email is required'),
		subject: Yup.string().required('Subject is required'),
		message: Yup.string().required('Message is required')
	})
	async function sendEmail(values,{ resetForm}) {
		const templateParams = {
			name: values.name,
			email: values.email,
			subject: values.subject,
			message: values.message,
		};

		try {
			await emailjs.send(
				'service_rvvy0zr',
				'template_h2b84lt',
				templateParams,
				'BOkCi15o_1Ynsz9L-'
			);

			console.log('Email sent successfully!');
			toast.success('Successfully sent email message');
		} catch (error) {
			console.error('Email sending failed!', error);
			toast.error('Failed to send email message');
		}

		resetForm()
	}
	return (
		<>
		<Header/>
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
					<span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
					<small>/</small>
					<span className='text-black/70 text-xl tracking-widest font-semibold'>About Us</span>
				</h1>

				<div className='bg-white rounded shadow p-3 mt-8 grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-2'>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={sendEmail}>
						<Form className='flex flex-col justify-start items-start space-y-5'>
							<h1 className='text-[#007bff] text-xl tracking-widest lg:ml-2'> Get In Touch </h1>
							<div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2 justify-start items-start'>
								<div className='w-full'>
									<Field className=' w-full p-3 rounded shadow outline-[#007bff]' type='text' placeholder='Name' name='name' />
									<ErrorMessage component='div' className='text-red-500' name='name' />
								</div>
								<div className='w-full'>
									<Field className=' w-full p-3 rounded shadow outline-[#007bff]' type='text' placeholder='Email' name='email' />
									<ErrorMessage component='div' className='text-red-500' name='email' />
								</div>
							</div>
							<div className='w-full'>
								<Field className=' w-full p-3 rounded shadow outline-[#007bff]' type='text' placeholder='Subject' name='subject' />
								<ErrorMessage component='div' className='text-red-500' name='subject' />
							</div>
							<div className='w-full'>
								<Field className=' w-full p-3 rounded shadow outline-[#007bff]' as='textarea' placeholder='Message' name='message' />
								<ErrorMessage component='div' className='text-red-500' name='message' />
							</div>
							{
								auth ? <button type='submit' className='w-full p-3 rounded text-white bg-[#007bff] hover:bg-blue-700 '>Send Message</button>
								: <Link to='/Job_seeker_signin' type='submit' className='w-full p-3 rounded text-white bg-[#007bff] hover:bg-blue-700 '>Send Message</Link>
							}
							
						</Form>
					</Formik>
					<div className='bg-[#007bff] h-[100%] text-[#007bff] p-2 flex flex-col justify-start items-start gap-2 space-y-5'>
						<h1 className=' ml-5 text-xl tracking-widest text-white'>Contact Us</h1>
						<div className='ml-5 flex flex-row justify-start items-center gap-2'>
							<MdLocationOn size={30} className='inline p-2 bg-white' />
							<p className=' text-lg tracking-widest text-white'>Mogadishu-Somalia</p>
						</div>
						<div className='ml-5 flex flex-row justify-start items-center gap-2'>
							<MdPhone size={30} className='inline p-2 bg-white' />
							<p className=' text-lg tracking-widest text-white'>+ 252618302314</p>
						</div>
						<div className='ml-5 flex flex-row justify-start items-center gap-2'>
							<MdEmail size={30} className='inline p-2 bg-white' />
							<p className=' text-lg tracking-widest text-white'>workhubso@gmail.com</p>
						</div>
						<div className='ml-5 flex flex-row justify-start items-center gap-2'>
							<BiWorld size={30} className='inline p-2 bg-white' />
							<p className=' text-lg tracking-widest text-white'>workhubso.com</p>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</>
	)
}

export default Contact