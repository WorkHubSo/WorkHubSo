import { BsFileTextFill } from "react-icons/bs"
import { MdDashboard, MdEdit, MdLock, MdSupervisedUserCircle } from "react-icons/md"
import { SiWorkplace } from "react-icons/si"
import { Link } from "react-router-dom"

const Dashboard_sidebar = () => {
  return (
	<div className="w-full lg:w-[22%] fixed left-0 lg:left-10 top-0 bottom-0 bg-[#f5f5f5] p-5">
		<h1 className=" text-xl tracking-tighter"><SiWorkplace size={40} className="inline text-[#007bff]"/>ork<span className="text-[#333333]">Hubso</span></h1>
		<h4 className=" mt-10 text-lg tracking-tighter text-black/50">Company tools</h4>
		<div className="mt-10 w-full p-1 flex flex-col justify-start items-start gap-3 space-y-4 text-lg tracking-tighter font-medium">
			<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard'><MdDashboard size={25} className="inline"/> <span>Dashboard</span></Link>
			<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/edit_profile'><MdEdit/> <span>Edit Profile</span></Link>
			<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/job_offer'><BsFileTextFill size={25} className="inline"/> <span>New Job Offer</span></Link>
			<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/candidate'><MdSupervisedUserCircle size={25} className="inline"/> <span>Candidates</span></Link>
			<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/change_password'><MdLock size={25} className="inline"/> <span>Change Password</span></Link>
		</div>
	</div>
  )
}

export default Dashboard_sidebar