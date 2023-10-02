import { BsFacebook, BsGithub, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinktree } from "react-icons/si";
import { Link } from "react-router-dom";
import { useGetCurrentJobSeekerEducationQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_education";
import { useGetCurrentJobSeekerExperiencesQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_experiences";
import { useGetCurrentJobSeekerLanguageQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_language_slice";
import { useGetCurrentJobSeekerQuery, useGetJobSeekersQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_slice";
import { useGetCurrentJobSeekerSocialLinkQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_social_links";

const Sidebar_view_profile = () => {
	const { data : user = {} } = useGetCurrentJobSeekerQuery();
	const { data : users = {} } = useGetJobSeekersQuery();
	const { data: social_links_data = {} } = useGetCurrentJobSeekerSocialLinkQuery();
	const { data: language_data = {} } = useGetCurrentJobSeekerLanguageQuery();
	const jobSeeker = users?.user?.find( (res) => {
		return  res._id == user?._id
	} )

	const jobSeekerProfile = (
		<div className="w-full flex flex-col  justify-center items-center gap-2 space-y-2">
			<img className="w-[70%] h-40 object-cover bg-center rounded-[100%]" src={`../../../../public/uploads/${jobSeeker?.photo}`} alt="" />
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
				social_links_data?.get_social_links?.map(res => {
					return (
						<div className="w-full flex flex-col justify-start gap-4 items-start" key={res?._id}>
							<div className="w-full flex flex-row justify-between items-start">
								<div className="w-full space-y-3">
									<div className="flex flex-row justify-start items-start gap-4">
										<Link target="_blank" to={`https://www.linkedin.com/in/${res?.linkedIn}/`}><BsLinkedin size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://www.facebook.com/${res?.facebook}`}><BsFacebook size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://twitter.com/${res?.twitter}`}><BsTwitter size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://github.com/${res?.github}`}><BsGithub size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://linktr.ee/${res?.linkTree}`}><SiLinktree size={25} className=" inline text-blue-500"/></Link>
										<Link target="_blank" to={`https://www.youtube.com/@${res?.Youtube}`}><BsYoutube size={25} className=" inline text-blue-500"/></Link>
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
				language_data?.get_language?.map(res => {
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
	<div className="w-full">
		{jobSeekerProfile}
		{socialLinksComponent}
		{languagesComponent}
	</div>
  )
}

export default Sidebar_view_profile