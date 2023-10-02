import { Sidebar_view_profile } from '../../../index'
import { useGetCurrentJobSeekerEducationQuery } from '../../../redux/job_seeker_redux/slices/job_seeker_education';
import { useGetCurrentJobSeekerExperiencesQuery } from '../../../redux/job_seeker_redux/slices/job_seeker_experiences';
import { useGetCurrentJobSeekerReferencesQuery } from '../../../redux/job_seeker_redux/slices/job_seeker_references';
import { useGetCurrentJobSeekerSkillsQuery } from '../../../redux/job_seeker_redux/slices/job_seeker_skills';
import { useGetCurrentJobSeekerQuery, useGetJobSeekersQuery } from '../../../redux/job_seeker_redux/slices/job_seeker_slice';
import { Footer, Header } from '../../../index'
const View_job_seeker_profile = () => {

	const { data: user = {} } = useGetCurrentJobSeekerQuery();
	const { data: users = {} } = useGetJobSeekersQuery();
	const { data: skill_data = {} } = useGetCurrentJobSeekerSkillsQuery();
	const { data: educations_data = {} } = useGetCurrentJobSeekerEducationQuery();
	const { data: experience_data = {} } = useGetCurrentJobSeekerExperiencesQuery();
	const { data: reference_data = {} } = useGetCurrentJobSeekerReferencesQuery();
	const jobSeeker = users?.user?.find((res) => {
		return res._id == user?._id
	})

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
				skill_data?.get_skills?.map(res => {
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
				educations_data?.get_educations?.map(res => {
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
				experience_data?.get_experiences?.map(res => {
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
				reference_data?.reference?.map(res => {
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


	return (
		<>
		<Header/>
			<div className="w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28">
				<h1 className="w-full text-lg tracking-widest flex flex-row justify-start items-start gap-4">
					<span className=" text-[#007bff]">Home</span>
					<small>/</small>
					<span>View Profile</span>
				</h1>
				<div className="w-full mt-10  flex flex-col lg:flex-row gap-3 justify-start items-start">
					<div className="w-full lg:w-[34%] bg-white p-5 rounded-md h-fit shadow-md">
						<Sidebar_view_profile />
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
			<Footer/>
		</>
	)
}

export default View_job_seeker_profile