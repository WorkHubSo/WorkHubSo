import { Link, useLocation } from "react-router-dom";
import { MdLocationOn, MdOutlineAttachMoney, MdOutlineCategory, MdTitle } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { BiTime } from "react-icons/bi";
const View_Job_detail = () => {

	// fetching single jobs data
	const res_job = useLocation().state;
	console.log('res_job',res_job);
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
					<p className='text-base flex flex-row justify-start items-center gap-2'><BiTime className="text-[#007bff]" size={20} /> <span className="">Type : </span>   {res_job?.typeEmployement}</p>
					<p className='text-base flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney className="text-[#007bff]" size={20} />  <span className="">Salary : </span>  {res_job?.salary}</p>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
					<Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
					<small>/</small>
					<span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Manage Jobs</span>
				</h1>
				<div className='w-full p-2 mt-2'>
				</div>
				<div className="w-full mt-5 flex flex-col justify-start items-start gap-2 space-y-3">
					{jobComponent}
				</div>
			</div>
		</>
	)
}

export default View_Job_detail