import Cookies from "js-cookie"
import { AiOutlineClose } from "react-icons/ai"
import { BsFileTextFill, BsTable } from "react-icons/bs"
import { MdDashboard, MdEdit, MdLock, MdLogout } from "react-icons/md"
import { SiWorkplace } from "react-icons/si"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Dashboard_sidebar = ({ setShowMenu, showMenu }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove('employerToken')
		navigate('/')
		toast.success('Successfully Log out')
	}
	return (
		<div className={`w-full lg:w-[22%] fixed left-0 lg:left-10 top-0 bottom-0 bg-[#f5f5f5] p-5 ${showMenu ? 'hidden lg:flex lg:flex-col' : 'flex flex-col w-full'}`}>
			<div className="w-full lg:w-fit flex flex-row justify-between items-center gap-4">
				<h1 className=" text-xl tracking-tighter mt-5"><SiWorkplace size={40} className="inline text-[#007bff]" />ork<span className="text-[#333333]">Hubso</span></h1>
				<AiOutlineClose size={25} className="lg:hidden block absolute right-5" onClick={() => setShowMenu(!showMenu)} />
			</div>
			<div className={`w-full p-1 flex flex-col justify-start items-start gap-3 space-y-4 text-lg tracking-tighter font-medium mt-16 ${showMenu ? 'hidden lg:block lg:w-full lg:flex' : 'block'}`} onClick={() => setShowMenu(!showMenu)}>
				<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard'><MdDashboard size={25} className="inline" /> <span>Dashboard</span></Link>
				<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/job_offer'><BsFileTextFill size={25} className="inline" /> <span>New Job Offer</span></Link>
				<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/edit_profile'><MdEdit /> <span>Edit Profile</span></Link>
				<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/manage_jobs'><BsTable /> <span>Manage Jobs</span></Link>
				<Link className=" flex flex-row justify-start items-center gap-3" to='/Dashboard/change_password'><MdLock size={25} className="inline" /> <span>Change Password</span></Link>
				<button className=" flex flex-row justify-start items-center gap-3" onClick={() => handleLogout()}><MdLogout size={25} className="inline" /> <span>Log out</span></button>
			</div>
		</div>
	)
}

export default Dashboard_sidebar