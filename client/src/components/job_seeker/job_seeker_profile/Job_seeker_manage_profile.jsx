import { useLocation } from 'react-router-dom'
import { Category, Sidebar_manage_profile, Update_job_seeker_profile } from '../../../index.js'
const Job_seeker_manage_profile = () => {
	const update_res_state = useLocation().state;
  return (
	<div className="w-[80%] mx-auto p-4 mt-40 lg:mt-28">
		<h1 className="w-full text-lg tracking-widest flex flex-row justify-start items-start gap-4"> 
		<span className=" text-[#007bff]">Home</span>
		<small>/</small> 
		<span>Manage Profile</span> 
		</h1>
		<div className="w-full mt-10  flex flex-col lg:flex-row gap-3 justify-start items-start">
			<div className="w-full lg:w-[30%] bg-white p-5 rounded-md h-[90vh] shadow-md">
				<Sidebar_manage_profile/>
			</div>
			<div className='w-full lg:w-[100%] flex flex-col justify-start items-start space-y-3'>
				<Update_job_seeker_profile/>
				<Category update_res_state = { update_res_state }/>
			</div>
		</div>

	</div>
  )
}

export default Job_seeker_manage_profile