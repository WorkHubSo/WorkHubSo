import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Footer, Header } from '../index';
import { useGetEmployersAuthQuery } from "../redux/employer_redux/slices/Employer_auth_slice";
import { useGetJobOffersQuery } from "../redux/employer_redux/slices/Employer_job_offer";
import { MdLocationOn, MdOutlineAttachMoney, MdOutlineCategory, MdTitle } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { BiTime } from "react-icons/bi";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { LuImagePlus } from 'react-icons/lu';
import axios from "axios";
import { useGetCurrentJobSeekerQuery } from "../redux/job_seeker_redux/slices/job_seeker_slice";
import { useAddJobCandidateMutation } from "../redux/employer_redux/slices/JobCandidates";
import { toast } from "react-toastify";
Modal.setAppElement('#root')
import '../App.css'
import Cookies from "js-cookie";


const Job_detail = () => {

	const jobSeekerToken = Cookies.get('jobSeekerToken')
	const employerToken = Cookies.get('employerToken')
	const [ auth , setAuth ] = useState(false);

	useEffect(()=> {
		if(jobSeekerToken || employerToken){
			setAuth(true);
		}else{
			setAuth(false);
		}
	},[])
	// upload resumes files states 
	const [files, setFiles] = useState(null);
	// implemented model functionalities
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// fetching single jobs data
	const job_id = useLocation().state;
	const { data: jobs = [] } = useGetJobOffersQuery();
	const fetch_signle_job = jobs?.get_job_offer || []
	const res_job = fetch_signle_job?.find(res => res?._id == job_id?._id)

	//fetching employer that belongs to this detail job
	const { data: employer = [] } = useGetEmployersAuthQuery();
	const fetch_single_employer = employer?.employer || [];
	const res_employer = fetch_single_employer?.find(res => res?._id == res_job?.employerId);

	// apply jobs functionality
	const { data: jobSeeker = {} } = useGetCurrentJobSeekerQuery()
	const currentjobSekeer = jobSeeker?.user || [];
	const [addJobCandidate] = useAddJobCandidateMutation()
	const value = res_job?.description || ' '




	const upload = async () => {
		try {

			let formdata = new FormData();
			formdata.append('file', files || '');
			const res = await axios.post("http://localhost:8000/api/upload", formdata)
			return res.data;

		} catch (error) {
			console.log(`error uploading : ${error.message}`);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const jobSeekerResume = await upload();
			await addJobCandidate({
				JobOfferId: job_id?._id,
				jobSeekerId: currentjobSekeer?._id,
				jobSeekerName: currentjobSekeer?.fullName,
				jobSeekerEmail: currentjobSekeer?.email,
				jobTitle: job_id?.jobTitle,
				jobCategory: job_id?.category,
				jobSeekerResume: jobSeekerResume,
				jobSeekerImage : currentjobSekeer?.photo,
				jobOfferStatus: 'pending'
			}).then((res) => {
				const status = res.data.message;
				if (status) {
					toast.success(res.data.message);
				} else {
					toast.error(res.data.message);
				}
			})
		} catch (error) {
			console.log('error', error);
		}
	}
	const employerComponent = (
		<div className="p-2 w-full bg-white shadow rounded">
			<div className="w-full p-1 flex flex-col justify-start  gap-3 space-y-3" key={res_employer?._id}>
				<div className="w-full relative flex flex-row justify-start items-center">
					{res_employer?.cover ? <img className="w-full lg:h-96 object-center bg-cover " src={`/public/uploads/${res_employer?.cover}`} alt="" /> : " "}
					{res_employer?.logo ? <img className="w-32 h-16 rounded-md object-center bg-cover absolute left-3 top-3 md:left-10 md:top-10" src={`../../public/uploads/${res_employer?.logo}`} alt="" /> : " "}
				</div>

				<div className=" mt-5 flex flex-col justify-start items-start gap-3 space-y-2">
					<h1 className=" text-lg md:text-xl tracking-tighter md:tracking-widest md:font-semibold">{res_employer?.companyName}</h1>
					{/* <p className=" text-base md:text-lg tracking-tighter md:tracking-widest md:font-light">{}</p> */}
					<div dangerouslySetInnerHTML={{ __html: res_employer?.companyBio }} />
				</div>


				<div className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4 space-y-2 md:space-y-0">
					<div className="flex flex-row justify-start items-start gap-4">
						{res_employer?.linkedIn ? <Link target="_blank" to={`https://www.linkedin.com/in/${res_employer?.linkedIn}/`}><BsLinkedin size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.facebook ? <Link target="_blank" to={`https://www.facebook.com/${res_employer?.facebook}`}><BsFacebook size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.twitter ? <Link target="_blank" to={`https://twitter.com/${res_employer?.twitter}`}><BsTwitter size={25} className=" inline text-blue-500" /></Link> : ""}
						{res_employer?.instagram ? <Link target="_blank" to={`https://www.youtube.com/@${res_employer?.instagram}`}><BsInstagram size={25} className=" inline text-blue-500" /></Link> : ""}
					</div>
					{
						auth ? 					<div className=" flex flex-row justify-start items-start gap-2">
						<button className="px-5 py-2 rounded shadow bg-[#007bff] text-white hover:bg-blue-500">Save</button>
						<>
							<button className="px-5 py-2 rounded shadow bg-[#007bff] text-white hover:bg-blue-500" onClick={handleShow}>
								Apply
							</button>

							<Modal className='w-[80%] lg:w-[30%] bg-[#f5f5f5] mx-auto p-10 rounded mt-32' isOpen={show} onRequestClose={handleClose} >
								<h1 className="w-full text-xl tracking-widest text-center">upload resume</h1>
								<form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-start items-center gap-2 space-y-5">
									<div className="w-full relative space-y-3">
										{
											files ? <img className="mx-auto w-40 h-36 border-[4px] border-gray-500 rounded-[100%] object-center bg-cover" src={URL.createObjectURL(files ||  '' )} alt="" /> : 
											<img className="mx-auto w-40 h-36 border-[4px] border-gray-500 rounded-[100%] object-center bg-cover" src="" alt="" />
										}
										<input className="hidden" type="file" name="file" id="file" onChange={(e) => setFiles(e.target.files[0])} />
										<label className=" absolute right-[4%] lg:right-[15%] top-16 cursor-pointer" htmlFor="file"><LuImagePlus size={30} /></label>
									</div>
									<div className="flex flex-row justify-center items-start gap-4">
										<button className="text-xl text-white tracking-widest p-3 rounded shadow bg-slate-900 hover:bg-slate-700" onClick={handleClose}>Close</button>
										<button type="submit" className="text-xl text-white tracking-widest p-3 rounded shadow bg-[#007bff] hover:bg-blue-600">Save</button>
									</div>
								</form>
							</Modal>
						</>
					</div>  : " "
					}
				</div>
			</div>

		</div>
	)


	const jobComponent = (
		<div className="p-2 w-full bg-white shadow rounded flex flex-col lg:flex-row justify-start items-start gap-5">
			<div className="w-full p-2 lg:w-[75%]">
				<h1 className="text-xl tracking-wider text-[#007bff]">Job description</h1>
				<hr className="w-full border-[1px] mt-4 border-slate-300" />
				{/* <p className="mt-4 text-base lg:text-lg tracking-wide">{res_job?.description}</p> */}
				{/* <div dangerouslySetInnerHTML={{__html :  }}/> */}

				<div dangerouslySetInnerHTML={{__html : value}}/>
				

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
			<Header />
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
				<Link to='/' className="text-[#007bff] text-xl tracking-widest font-semibold">Home</Link>
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