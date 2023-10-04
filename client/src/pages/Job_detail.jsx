import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Footer, Header } from '../index';
import { useGetEmployersAuthQuery } from "../redux/employer_redux/slices/Employer_auth_slice";
import { useGetJobOffersQuery } from "../redux/employer_redux/slices/Employer_job_offer";
import { MdLocationOn, MdOutlineAttachMoney, MdOutlineCategory, MdTitle } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { BiTime } from "react-icons/bi";

const Job_detail = () => {

	// fetching single jobs data
	const job_id = useLocation().state;
	const { data: jobs = [] } = useGetJobOffersQuery();
	const fetch_signle_job = jobs?.get_job_offer || []
	const res_job = fetch_signle_job?.find(res => res?._id == job_id?._id)

	//fetching employer that belongs to this detail job
	const { data: employer = [] } = useGetEmployersAuthQuery();
	const fetch_single_employer = employer?.employer || [];
	const res_employer = fetch_single_employer?.find(res => res?._id == res_job?.employerId);
	const employerComponent = (
		<div className="p-2 w-full bg-white shadow rounded">
			<div className="w-full p-1 flex flex-col justify-start  gap-3 space-y-3" key={res_employer?._id}>
				<div className="w-full flex flex-row justify-start items-center">
					{/* <img className=" absolute left-0 right-0 top-0 w-full h-48 bg-cover object-center rounded" src="" alt="" style={{ backgroundImage: `url(${static_covver})` }} /> */}
					{res_employer?.logo ? <img className="w-32 h-16 object-center bg-cover" src={`../../public/uploads/${res_employer?.logo}`} alt="" /> : <img className="w-24 h-20 object-center bg-cover" src={`../../public/uploads/${res_employer?.cover}`} alt="" />  }
				</div>

				<div className=" mt-5 flex flex-col justify-start items-start gap-3 space-y-2">
					<h1 className=" text-lg md:text-xl tracking-tighter md:tracking-widest md:font-semibold">{res_employer?.companyName}</h1>
					<p className=" text-base md:text-lg tracking-tighter md:tracking-widest md:font-light">{res_employer?.companyBio}</p>
				</div>


				<div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 space-y-2 md:space-y-0">
					<div className="flex flex-row justify-start items-start gap-4">
						{res_employer?.linkedIn ? <Link target="_blank" to={`https://www.linkedin.com/in/${res_employer?.linkedIn}/`}><BsLinkedin size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.facebook ? <Link target="_blank" to={`https://www.facebook.com/${res_employer?.facebook}`}><BsFacebook size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.twitter ? <Link target="_blank" to={`https://twitter.com/${res_employer?.twitter}`}><BsTwitter size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.instagram ? <Link target="_blank" to={`https://www.youtube.com/@${res_employer?.instagram}`}><BsInstagram size={25} className=" inline text-blue-500" /></Link> : ""}
					</div>
					<div className=" flex flex-row justify-start items-start gap-2">
						<button className="px-5 py-2 rounded shadow bg-[#007bff] text-white hover:bg-blue-500">Save</button>
						<button className="px-5 py-2 rounded shadow bg-[#007bff] text-white hover:bg-blue-500">Apply</button>
					</div>
				</div>
			</div>

		</div>
	)


	const jobComponent = (
		<div className="p-2 w-full bg-white shadow rounded flex flex-col lg:flex-row justify-start items-start gap-5">
			<div className="w-full p-2 lg:w-[75%]">
				<h1 className="text-xl tracking-wider text-[#007bff]">Job description</h1>
				<hr className="w-full border-[1px] mt-4 border-slate-300" />
				<p className="mt-4 text-base lg:text-lg tracking-wide">{res_job?.description}</p>
			</div>
			<div className="w-full lg:w-[35%] p-2 border-[1px] rounded-md">
				<h1 className="text-xl tracking-wider text-[#007bff] ">Job Summary</h1>
				<hr className="w-full border-[1px] mt-4 border-slate-300" />
				<div className="space-y-5 p-3 mt-4">
					<p className='text-base flex flex-row justify-start items-center gap-2'><MdTitle className="text-[#007bff]" size={20} />  <span className="">Job Title : </span>  {res_job?.jobTitle}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><MdOutlineCategory className="text-[#007bff]" size={20} />  <span className="">Category : </span>  {res_job?.category}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><MdLocationOn className="text-[#007bff]" size={20} />  <span className="">Location : </span>  {res_job?.location}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><CgCalendarDates className="text-[#007bff]" size={20} />  <span className="">Deadline : </span>   {res_job?.deadline?.substring(0, 10)}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><BiTime  className="text-[#007bff]" size={20} /> <span className="">Type : </span>   {res_job?.typeEmployement}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney className="text-[#007bff]" size={20} />  <span className="">Salary : </span>  {res_job?.salary}</p>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<Header />
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
					<span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
					<small>/</small>
					<span className='text-black/70 text-xl tracking-widest font-semibold'>Job Detail</span>
				</h1>
			</div>
			<div className="w-[80%] mx-auto flex flex-col justify-start items-start gap-2 space-y-3">
				{employerComponent}
			</div>
			<div className="w-[80%] mt-14 mx-auto flex flex-col justify-start items-start gap-2 space-y-3">
				{jobComponent}
			</div>

			<Footer />
		</>
	)
}

export default Job_detail