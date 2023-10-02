import { Link, useLocation } from 'react-router-dom';
import { Footer, Header } from '../index';
import { useGetJobSeekerEducationQuery } from '../redux/job_seeker_redux/slices/job_seeker_education';
import { useGetJobSeekerExperiencesQuery } from '../redux/job_seeker_redux/slices/job_seeker_experiences';
import { useGetJobSeekerReferencesQuery } from '../redux/job_seeker_redux/slices/job_seeker_references';
import { useGetJobSeekerSkillsQuery } from '../redux/job_seeker_redux/slices/job_seeker_skills';
import { useGetJobSeekersQuery } from '../redux/job_seeker_redux/slices/job_seeker_slice';
import { BsFacebook, BsGithub, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';
import { SiLinktree } from 'react-icons/si';
import { useGetJobSeekerSocialLinksQuery } from '../redux/job_seeker_redux/slices/job_seeker_social_links';
import { useGetJobSeekersLanguageQuery } from '../redux/job_seeker_redux/slices/job_seeker_language_slice';
const Resume_detail = () => {
	const { data: users = {} } = useGetJobSeekersQuery();
	const states = useLocation().state;
	const resumeId = states?._id;
	const { data: skill_data = [] } = useGetJobSeekerSkillsQuery();
	const { data: educations_data = [] } = useGetJobSeekerEducationQuery();
	const { data: experience_data = [] } = useGetJobSeekerExperiencesQuery();
	const { data: reference_data = [] } = useGetJobSeekerReferencesQuery();
	const { data: social_links_data = [] } = useGetJobSeekerSocialLinksQuery();
	const { data: language_data = [] } = useGetJobSeekersLanguageQuery();
	console.log('skill_data', skill_data);
	const skills = skill_data?.get_skills || []
	const educations = educations_data?.get_educations || []
	const experiences = experience_data?.get_experiences || []
	const references = reference_data?.reference || []
	const social_links = social_links_data?.get_social_links || []
	const languages = language_data?.get_language || []
	const jobSeeker = users?.user?.find((res) => {
		return res._id == resumeId
	})
	const resumeskills = skills.filter((res) => {
		return res.jobSeekerId == resumeId
	})
	const resumeEducations = educations.filter((res) => {
		return res.jobSeekerId == resumeId
	})
	const resumeExperiences = experiences.filter((res) => {
		return res.jobSeekerId == resumeId
	})
	const resumeReferences = references.filter((res) => {
		return res.jobSeekerId == resumeId
	})
	const resumeSocialLinks = social_links.filter((res) => {
		return res.jobSeekerId == resumeId
	})
	const resumeLanguages = languages.filter((res) => {
		return res.jobSeekerId == resumeId
	})

	console.log('jobSeeker', jobSeeker);
	console.log('resumeskills', resumeskills);
	console.log('resumeEducations', resumeEducations);
	console.log('resumeExperiences', resumeExperiences);
	console.log('resumeReferences', resumeReferences);
	console.log('resumeLanguages', resumeLanguages);
	console.log('resumeId', resumeId);


	const jobSeekerBio = (
		<div className="w-[90%] mx-auto flex flex-col  justify-start items-center gap-2 space-y-2">
			<div className="w-full space-y-2 text-start">
				<p className=" text-xl text-center tracking-widest">Hi,{jobSeeker?.fullName}</p>
				<p className="text-justify md:text-start text-base text-gray-700">{jobSeeker?.aboutMe}</p>
				{/* <p className="w-full text-sm tracking-tighter text-gray-700 text-start">{jobSeeker?.aboutMe.substring(0,120)}</p> */}
			</div>
			<hr className="w-full mt-5" />

		</div>
	)



	const skillsComponent = (
		<div className=" w-[90%] mx-auto mt-5 flex flex-col justify-start gap-2 space-y-3">
			<h1 className=" text-lg tracking-tighter font-medium">Skills</h1>
			{
				resumeskills?.map(res => {
					return (
						<ul className="text-gray-700 flex flex-col justify-start gap-3 items-start" key={res?._id}>
							<li className=" ml-10 list-disc text-lg tracking-tighter">{res?.skill}</li>
						</ul>
					)
				})
			}
			<hr className="w-full mt-5" />
		</div>
	)


	const educationComponent = (
		<div className="w-[90%] mx-auto mt-5 flex flex-col justify-start gap-2 space-y-3">
			<h1 className=" text-lg tracking-tighter font-medium">Educations</h1>
			{
				resumeEducations?.map(res => {
					return (
						<ul className="flex flex-col justify-start items-start text-gray-700 space-y-2" key={res?._id}>
							<li className="list-disc ml-10 w-full text-lg tracking-tighter">
								<div className='flex flex-col md:flex-row justify-start items-start gap-4'>
									<span>{res?.degree}</span>
									<span>{res?.institution}</span>
									<span>{res?.graduationDate.substring(0, 10)}</span>
								</div>
							</li>
						</ul>

					)
				})
			}
			<hr className="w-full mt-5" />
		</div>
	)


	const experienceComponent = (
		<div className="w-[90%] mx-auto mt-5 flex flex-col justify-start gap-2 space-y-3">
			<h1 className=" text-lg tracking-tighter font-medium">Experiences</h1>

			{
				resumeExperiences.map(res => {
					return (
						<ul className="flex flex-col justify-start items-start text-gray-700 space-y-3" key={res?._id}>
							<li className="list-disc ml-10 w-full text-lg tracking-tighter">
								<div className='flex flex-col md:flex-row justify-start items-start gap-4'>
									<span>{res?.jobTitle},</span>
									<span>{res?.years},</span>
									<span>{res?.employeType}</span>
								</div>
							</li>
						</ul>
					)
				})
			}
			<hr className="w-full mt-5" />
		</div>
	)


	const referenceComponent = (
		<div className="w-[90%] mx-auto mt-5 flex flex-col justify-start gap-2 space-y-3">
			<h1 className=" text-lg tracking-tighter font-medium">References</h1>

			{
				resumeReferences.map(res => {
					return (
						<ul className="flex flex-col justify-start items-start text-gray-700 space-y-4" key={res?._id}>
							<li className="list-disc ml-10 w-full text-lg tracking-tighter">
								<div className=' flex flex-col md:flex-row justify-between items-start gap-2'>
									<span>{res?.fullName},</span>
									<span>{res?.email},</span>
									<span>{res?.phone},</span>
									<span>{res?.company},</span>
									<span>{res?.position},</span>
								</div>
							</li>
						</ul>
					)
				})
			}
			<hr className="w-full mt-5" />
		</div>
	)


	const jobSeekerProfile = (
		<div className="w-full flex flex-col  justify-center items-center gap-2 space-y-2">
			{jobSeeker?.photo ? <img className="w-[70%] h-40 object-cover bg-center rounded-[100%]" src={`../../../../public/uploads/${jobSeeker?.photo}`} alt="" /> : 
			<img className="w-[70%] h-40 object-cover bg-center rounded-[100%]" src='/images/avator.png' alt="" /> }
			<div className="w-[90%] space-y-2 text-start">
				<p className=" text-xl text-center tracking-widest font-semibold">{jobSeeker?.fullName}</p>
				<p className=" text-center text-lg text-gray-700">{jobSeeker?.username}</p>
				{/* <p className="w-full text-sm tracking-tighter text-gray-700 text-start">{jobSeeker?.aboutMe.substring(0,120)}</p> */}
			</div>
			<hr className="w-full mt-5" />
			
		</div>
	)

	const socialLinksComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-3">
			<h1 className=" text-lg tracking-widest font-medium">Social Links</h1>
			{
				resumeSocialLinks?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-row justify-start items-start gap-4">
										{res?.linkedIn ? <Link target="_blank" to={`https://www.linkedin.com/in/${res?.linkedIn}/`}><BsLinkedin size={25} className=" inline text-blue-500"/></Link> : ""}
										{res?.facebook ? <Link target="_blank" to={`https://www.facebook.com/${res?.facebook}`}><BsFacebook size={25} className=" inline text-blue-500"/></Link> : ""}
										{res?.twitter ? <Link target="_blank" to={`https://twitter.com/${res?.twitter}`}><BsTwitter size={25} className=" inline text-blue-500"/></Link> : "" }
										{res?.github ? <Link target="_blank" to={`https://github.com/${res?.github}`}><BsGithub size={25} className=" inline text-blue-500"/></Link> : "" }
										{res?.linkTree ? <Link target="_blank" to={`https://linktr.ee/${res?.linkTree}`}><SiLinktree size={25} className=" inline text-blue-500"/></Link> : ""}
										{res?.Youtube ? <Link target="_blank" to={`https://www.youtube.com/@${res?.Youtube}`}><BsYoutube size={25} className=" inline text-blue-500"/></Link> : "" }
									</div>
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

	const languagesComponent = (
		<div className="mt-5 flex flex-col justify-start gap-2 space-y-2">
			<h1 className=" text-lg tracking-tighter font-medium">Languages</h1>
			{
				resumeLanguages?.map(res => {
					return (
						<ul className="text-gray-700 flex flex-col justify-start gap-3 items-start" key={res?._id}>
							<li className=" ml-4 list-disc text-lg tracking-tighter">{res?.language}</li>
						</ul>
					)
				})
			}
			<hr className="w-full mt-5" />
		</div>
	)
	return (
		<>
			<Header />
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
					<span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
					<small>/</small>
					<span className='text-black/70 text-xl tracking-widest font-semibold'>Resumes Detail</span>
				</h1>
				<div className="w-full mt-10  flex flex-col lg:flex-row gap-3 justify-start items-start">
					<div className="w-full lg:w-[34%] bg-white p-5 rounded-md h-fit shadow-md">
						<div className="w-full">
							{jobSeekerProfile}
							{socialLinksComponent}
							{languagesComponent}
						</div>
					</div>
					<div className='w-full lg:w-[100%] flex flex-col justify-start items-start space-y-4 bg-white p-5 rounded-md h-fit shadow-md'>
						<h1 className=' w-[90%] mx-auto text-2xl text-widest font-semibold'>Professional summury</h1>
						{jobSeekerBio}
						{skillsComponent}
						{educationComponent}
						{experienceComponent}
						{referenceComponent}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Resume_detail