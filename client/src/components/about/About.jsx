import { Footer, Header } from '../../index'
const About = () => {
	return (
		<>
		<Header/>
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
					<span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
					<small>/</small>
					<span className='text-black/70 text-xl tracking-widest font-semibold'>About Us</span>
				</h1>
				<div className='mt-5 bg-white border-2 p-5 rounded-sm'>
					<h1 className='text-[#007bff] text-xl tracking-widest font-semibold'>BIO</h1>
					<p className=' mt-2 text-justify text-base tracking-widest'>Welcome to our job search platform, dedicated to connecting job seekers and employers in Somalia. We are committed to building a robust platform that enables job seekers to create profiles, upload resumes, and receive job alerts.
						Employers can showcase their company profiles and job openings. We go beyond job listings by providing valuable career resources and industry insights. Our platform empowers individuals to navigate their professional journeys successfully and make informed decisions.
						Join us as we bridge the gap between talent and opportunity, driving economic growth and fostering meaningful connections in Somalia's job marke</p>
				</div>
				<div className='mt-4 bg-white border-2 p-5 rounded-sm'>
					<h1 className='text-[#007bff] text-xl tracking-widest font-semibold'>vision</h1>
					<p className=' mt-2 text-justify text-base tracking-widest'>
						Our vision is to revolutionize the job market in Somalia by providing a cutting-edge job search platform that seamlessly connects job seekers and employers.
						We aim to be the go-to platform for individuals seeking employment and businesses looking for top talent. By leveraging advanced features like profile creation, resume uploads, job alerts, and employer profiles,
						we envision a future where every job seeker finds their dream career and every employer discovers the perfect match for their team
					</p>
				</div>
				<div className='mt-4 bg-white border-2 p-5 rounded-sm'>
					<h1 className='text-[#007bff] text-xl tracking-widest font-semibold'>Mission</h1>
					<p className=' mt-2 text-justify text-base tracking-widest'>
						Our mission is to empower job seekers and employers in Somalia by building a comprehensive job search platform. We are committed to facilitating meaningful connections and fostering a thriving job market.
						Through our platform, we provide job seekers with the tools they need to showcase their skills and qualifications, while also offering valuable career resources and industry insights. For employers,
						we create a platform that allows them to find the best talent and make informed hiring decisions. By connecting job seekers and employers,
						we strive to drive economic growth and contribute to a prosperous workforce in Somalia.
					</p>
				</div>
			</div>
			<Footer/>
		</>
	)
}

export default About