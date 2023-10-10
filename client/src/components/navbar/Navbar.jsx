import { Link } from "react-router-dom"

const Navbar = () => {
  return (
	<div className="w-full h-screen">
		<div className="w-[80%] mt-24 md:mt-28  mx-auto grid grid-cols-1 lg:grid-cols-2 justify-start items-center gap-5">
			<div className=" w-full flex flex-col justify-start items-start gap-5">
				<h1 className="text-2xl w-full  md:text-4xl tracking-widest uppercase" style={{lineHeight:'4rem'}}>Find Your Dream Job Most Easy Way</h1>
				<h3 className="text-xl  md:text-xl mt-3 font-medium  tracking-widest" style={{lineHeight:'3rem'}}>Find Jobs , Employements & Best Career Opportunities</h3>
				<div className="w-full mx-auto lg:mx-0  bg-white p-3 rounded-md shadow-md flex flex-col md:flex-row justify-start items-center gap-2">
					<input className="py-2 px-3 w-full md:w-fit outline-[#007bff] rounded" type="text" placeholder="Job title or keywords" />
					<input className="py-2 px-3 w-full md:w-fit outline-[#007bff]" type="text" placeholder="Locations" />
					<Link to='/Jobs' className="py-2 px-5 w-full md:w-fit rounded bg-[#007bff] text-white">Search</Link>
				</div>
			</div>
			<img className="w-full object-center bg-cover" src="../../../public/images/jobOffer.svg" alt="" />
		</div>
	</div>
  )
}

export default Navbar