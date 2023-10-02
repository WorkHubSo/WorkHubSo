import { BsFacebook, BsGithub, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs"
import { SiLinktree, SiWorkplace } from "react-icons/si"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<div className="w-full bg-[#020203] text-white tracking-widest text-base p-5 mt-24">
			<div className=" w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 justify-start items-start">

				<div className="flex flex-col justify-start items-start gap-2 space-y-2">
					<h1 className=" text-xl tracking-tighter"><SiWorkplace size={40} className="inline text-[#007bff]" />ork<span className="text-white">Hubso</span></h1>
					<div className=" space-y-4">
						<p>Email : workhubso@gmail.com</p>
						<p>Phone : 252615081247</p>
					</div>
				</div>

				<div className="flex flex-col justify-start items-start gap-2  space-y-4">
					<h1>Find</h1>
					<Link className=" cursor-pointer text-white hover:text-blue-500" to='/Jobs'>Jobs</Link>
					<Link className=" cursor-pointer text-white hover:text-blue-500" to='/Resumes'>Resumes</Link>
				</div>

				<div className="flex flex-col justify-start items-start gap-2 space-y-4">
					<h1>Support</h1>
					<Link className=" cursor-pointer text-white hover:text-blue-500" to='/Contact'>Contact</Link>
					<Link className=" cursor-pointer text-white hover:text-blue-500" to='/About'>About</Link>
				</div>


			</div>
			<hr className="w-full md:w-[80%] mx-auto bg-white mt-5" />
			<div className=" w-[80%] mx-auto mt-4 flex flex-col md:flex-row justify-between items-center gap-2 space-y-2">
				<p className=" text-center md:text-start">© 2023 WorkHubSo Inc. All rights reserved | Powered By WorkHubSo Team</p>
				<div className="flex flex-row justify-start items-start gap-4">
					<Link target="_blank" to='https://www.linkedin.com/in/miirshe'><BsLinkedin size={25} className=" inline text-white hover:text-blue-500" /></Link>
					<Link target="_blank" to='https://www.facebook.com/miirshe'><BsFacebook size={25} className=" inline text-white hover:text-blue-500" /></Link>
					<Link target="_blank" to='https://twitter.com/miirshe'><BsTwitter size={25} className=" inline text-white hover:text-blue-500" /></Link>
					<Link target="_blank" to='https://github.com/miirshe'><BsGithub size={25} className=" inline text-white hover:text-blue-500" /></Link>
					<Link target="_blank" to='https://linktr.ee/miirshe'><SiLinktree size={25} className=" inline text-white hover:text-blue-500" /></Link>
					<Link target="_blank" to='https://www.youtube.com/@miirshe'><BsYoutube size={25} className=" inline text-white hover:text-blue-500" /></Link>
				</div>
			</div>
		</div>
	)
}

export default Footer