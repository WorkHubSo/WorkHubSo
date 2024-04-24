import { useState } from "react";
import { Footer, Header } from "../../../index.js";
import { useGetJobCandidateQuery } from "../../../redux/employer_redux/slices/JobCandidates";
import { useGetCurrentJobSeekerQuery } from "../../../redux/job_seeker_redux/slices/job_seeker_slice";
const Applied_jobs = () => {
	const [searchJobCandidate, setSearchJobCandidate] = useState('');
	const { data: candidateJobs = [] } = useGetJobCandidateQuery();
	const { data : jobSeekerJopOffer = [] } = useGetCurrentJobSeekerQuery();
	const currentJobSeekerAppliedJops = jobSeekerJopOffer?.user || []; 
	const currentJobCandidates = candidateJobs?.candidates || [];
	const get_current_applyied_jobs = currentJobCandidates?.filter(res => {
		return res?.jobSeekerId == currentJobSeekerAppliedJops?._id
	})
	const [currentPage, setCurrentPage] = useState(1);
	const recordPerge = 8;
	const lastIndex = currentPage * recordPerge;
	const firstIndex = lastIndex - recordPerge;
	const records = get_current_applyied_jobs.slice(firstIndex, lastIndex);
	const numberPage = Math.ceil(get_current_applyied_jobs.length / recordPerge);
	const numbers = [...Array(numberPage + 1).keys()].slice(1);

	return (
		<>
		<Header/>
			<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
				
				<div className="mt-10 w-full lg:w-[30%]">
					<input className="w-full p-3 rounded shadow outline-primaryColor " type="text" placeholder="search for job title"
						onChange={(e) => setSearchJobCandidate(e.target.value)} />
				</div>
				<div className="w-full mt-7 overflow-auto bg-white shadow rounded p-2">
					<table className="w-full">
						<thead>
							<tr className="text-white text-base text-start space-x-2 bg-primaryColor">
								<td className="p-2 ">JOB SEEKER NAME</td>
								<td className="p-2">JOB SEEKER EMAIL</td>
								<td className="p-2">JOB TITLE</td>
								<td className="p-2">JOB CATEGORY</td>
								<td className="p-2">JOB SEEKER RESUME</td>
								<td className="p-2">JOB OFFER STATUS</td>

							</tr>
						</thead>
						<tbody>
							{
								records?.filter(res => {
									return res?.jobTitle.toLowerCase().includes(searchJobCandidate.toLowerCase());
								})?.map(res => {
									return (

										<tr key={res?._id} className="w-full cursor-pointer space-x-2 border-b-[3px] border-b-[#f5f5f9]">
											<td className="p-2 text-base">{res?.jobSeekerName}</td>
											<td className="p-2 text-base">{res?.jobSeekerEmail}</td>
											<td className="p-2 text-base">{res?.jobTitle}</td>
											<td className="p-2 text-base">{res?.jobCategory}</td>
											<td className="p-2 text-base">
												<img className="w-20 h-20 object-cover bg-center rounded-lg" src={`../../../public/uploads/${res?.jobSeekerResume}`} alt="" />
											</td>
											<td className="p-2 text-base ">{res?.jobOfferStatus}</td>
											
										</tr>
									)
								})
							}
						</tbody>
					</table>
					<nav className="mt-20">
						<ul className="flex flex-row justify-start items-center gap-4">
							<li>
								<button
									onClick={prePage}
									className="bg-primaryColor hover:bg-blue-600 px-3 py-2 text-[#F7F5F5] rounded  shadow-lg"
								>
									previous
								</button>
							</li>
							{numbers.map((page, index) => {
								return (
									<li
										key={index}
										className={`${currentPage === page
											? "bg-primaryColor rounded px-3 py-1  text-[#F7F5F5] text-lg "
											: ""
											}`}
									>
										<button onClick={() => changeCurrentPage(page)}>{page}</button>
									</li>
								);
							})}
							<li>
								<button
									onClick={nextPage}
									className="bg-primaryColor hover:bg-blue-600 px-3 py-2  text-[#F7F5F5] rounded shadow-lg"
								>
									Next
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<Footer/>
		</>
	)

	function prePage() {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	}
	function changeCurrentPage(id) {
		setCurrentPage(id);
	}
	function nextPage() {
		if (currentPage !== numberPage) {
			setCurrentPage(currentPage + 1);
		}
	}

}

export default Applied_jobs