import { Link } from "react-router-dom"

const Header = () => {
  return (
	<div className=" w-[80%] mx-auto p-4">
		<div className="w-full flex flex-row justify-between items-center gap-2">
			<h1 className="text-3xl tracking-tighter"> <span className=" text-[#333333]">Work</span> <span className="text-[#007bff]">HubSo</span></h1>
			<div className="w-[80%] flex flex-col md:flex-row justify-evenly items-center p-1 gap-2">
				<Link className=" text-lg capitalize tracking-widest">Home</Link>
				<Link className=" text-lg capitalize tracking-widest">Jobs</Link>
				<Link className=" text-lg capitalize tracking-widest">Resumes</Link>
				<Link className=" text-lg capitalize tracking-widest">Contact</Link>
				<Link className=" text-lg capitalize tracking-widest">About Us</Link>
				<span className=" ml-5 flex flex-col md:flex-row justify-around items-center gap-5">
				<Link className="text-lg capitalize tracking-widest">Job Seeker</Link>
				<Link className="text-lg capitalize tracking-widest">Employer</Link>
				</span>
			</div>
		</div>
	</div>
  )
}

export default Header