import { useEffect, useState } from "react";
import { useGetCurrentJobSeekerQuery, useGetJobSeekersQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_slice";
const Sidebar_manage_profile = () => {
	const { data : user = {} } = useGetCurrentJobSeekerQuery();
	const { data : users = {} } = useGetJobSeekersQuery();
	const jobSeeker = users?.user?.find( (res) => {
		return  res._id == user?._id
	} )

	const jobSeekerProfile = (
		<div className="w-full flex flex-col  justify-center items-center gap-2 space-y-2">
			<img className="w-[80%] h-40 object-cover bg-center rounded-[100%]" src={`../../../../public/uploads/${jobSeeker?.photo}`} alt="" />
			<div className="w-[90%] space-y-2 text-start">
				<p className=" text-xl text-center tracking-widest font-semibold">{jobSeeker?.fullName}</p>
				<p className=" text-center text-lg text-slate-500">{jobSeeker?.username}</p>
				<p className="w-full text-base tracking-tighter text-start">{jobSeeker?.aboutMe.substring(0,120)}</p>
			</div>
			<hr className="w-full border-2  border-slate-300"/>
		</div>
	)
  return (
	<div className="w-full">
		{jobSeekerProfile}
	</div>
  )
}

export default Sidebar_manage_profile