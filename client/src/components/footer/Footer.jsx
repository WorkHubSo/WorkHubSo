import { BsFacebook, BsGithub, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs"
import { SiLinktree, SiWorkplace } from "react-icons/si"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<div className="w-full bg-primaryColor text-white tracking-widest  p-5  ">
			<div className=" w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 justify-start items-start">

				<div className="flex flex-col justify-start items-start gap-2 space-y-2">
					<h1 className=" text-xl tracking-tighter"><SiWorkplace size={40} className="inline text-White" />ork<span className="text-white">Hubso</span></h1>
					<div className=" space-y-4">
						<p>Email : workhubso@gmail.com</p>
						<p>Phone : 2526xxxxxxx</p>
					</div>
				</div>

				<div className="flex flex-col justify-start items-start gap-2  space-y-4">
					<h1>Find</h1>
					<Link className=" cursor-pointer text-white " to='/Jobs'>Jobs</Link>
					<Link className=" cursor-pointer text-white " to='/Resumes'>Resumes</Link>
				</div>

				<div className="flex flex-col justify-start items-start gap-2 space-y-4">
					<h1>Support</h1>
					<Link className=" cursor-pointer text-white " to='/Contact'>Contact</Link>
					<Link className=" cursor-pointer text-white " to='/About'>About</Link>
				</div>


			</div>
			<hr className="w-full md:w-[80%] mx-auto bg-white mt-5" />
			<div className=" w-[80%] mx-auto mt-4 flex flex-col md:flex-row justify-between items-center gap-2 space-y-2">
				<p className=" text-center md:text-start">© 2023 WorkHubSo Inc. All rights reserved | Powered By WorkHubSo Team</p>
				<div className="flex flex-row justify-start items-start gap-4">
					<Link target="_blank" to='https://www.linkedin.com/in/'><BsLinkedin size={25} className=" inline text-white " /></Link>
					<Link target="_blank" to='https://www.facebook.com/'><BsFacebook size={25} className=" inline text-white " /></Link>
					<Link target="_blank" to='https://twitter.com/'><BsTwitter size={25} className=" inline text-white " /></Link>
					<Link target="_blank" to='https://github.com/'><BsGithub size={25} className=" inline text-white " /></Link>
					<Link target="_blank" to='https://linktr.ee/'><SiLinktree size={25} className=" inline text-white " /></Link>
					<Link target="_blank" to='https://www.youtube.com/'><BsYoutube size={25} className=" inline text-white " /></Link>
				</div>
			</div>
		</div>
	)
}

export default Footer