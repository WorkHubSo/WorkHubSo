import { useEffect, useState } from "react";
import { useGetCurrentJobSeekerQuery, useGetJobSeekersQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_slice";
const Sidebar_manage_profile = () => {
	const { data : user = {} } = useGetCurrentJobSeekerQuery();
	const { data : users = {} } = useGetJobSeekersQuery();
	const jobSeeker = users?.user?.find( (res) => {
		return  res._id == user?._id
	} )

	const jobSeekerProfile = (
		<div className=" flex flex-col  justify-center items-center gap-2 space-y-2">
			<img className="w-[80%] h-40 object-cover bg-center rounded-[100%]" src={`../../../../public/uploads/${jobSeeker?.photo}`} alt="" />
			<div className=" space-y-2 text-center text-lg tracking-widest">
				<p>{jobSeeker?.fullName}</p>
				<p>{jobSeeker?.username}</p>
			</div>
			<hr className="w-full border-2 shadow-sm border-slate-100"/>
		</div>
	)
  return (
	<div className="w-full">
		{jobSeekerProfile}
	</div>
  )
}

export default Sidebar_manage_profile