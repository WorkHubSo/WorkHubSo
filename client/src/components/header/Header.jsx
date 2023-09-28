import { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineClose , AiOutlineMenu } from "react-icons/ai"
const Header = () => {
	const [ showMenu , setShowMenu ] = useState(true);
  return (
	<div className=" w-[80%] mx-auto p-4 fixed left-0 right-0 top-0 bg-[#f5f5f5]">
		<div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
			<div className="lg:w-[20%] w-full flex flex-row justify-between">
				<h1 className="text-3xl tracking-tighter"> <span className=" text-[#333333]">Work</span> <span className="text-[#007bff]">HubSo</span></h1>
				{
					showMenu ? <AiOutlineMenu size={25} className="lg:hidden cursor-pointer text-[#007bff]" onClick={()=> setShowMenu(!showMenu)}/> : 
					<AiOutlineClose size={25} className="lg:hidden text-[#007bff] cursor-pointer " onClick={()=> setShowMenu(!showMenu)}/>
				}
			</div>
			<div className={`${showMenu ? 'hidden lg:flex lg:w-[80%] flex-row' : 'block h-[100vh] overflow-auto lg:w-[80%]'}lg:w-[80%] flex flex-col lg:flex-row justify-evenly items-center p-1 gap-2`}>
				<Link className=" text-lg capitalize tracking-widest">Home</Link>
				<Link className=" text-lg capitalize tracking-widest">Jobs</Link>
				<Link className=" text-lg capitalize tracking-widest">Resumes</Link>
				<Link className=" text-lg capitalize tracking-widest">Contact</Link>
				<Link className=" text-lg capitalize tracking-widest">About Us</Link>
				<span className=" lg:ml-5 flex flex-col lg:flex-row justify-around items-center gap-5 space-y-3 lg:space-y-0">
				<Link className="text-lg capitalize tracking-widest">Job Seeker</Link>
				<Link className="text-lg capitalize tracking-widest">Employer</Link>
				</span>
			</div>
		</div>
	</div>
  )
}

export default Header