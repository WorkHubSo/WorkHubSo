import { Link } from "react-router-dom"
import { GrFormView } from "react-icons/gr"
import { TiDelete } from "react-icons/ti"
import { BiSolidEditAlt } from "react-icons/bi"
import { useState } from "react";
import { useDeleteJobCandidateMutation, useGetJobCandidateQuery } from "../../redux/employer_redux/slices/JobCandidates";
const Job_candidates = () => {
	const [searchJobCandidate, setSearchJobCandidate] = useState('');
	const { data : candidateJobs = [] } = useGetJobCandidateQuery();
	const [deleteJobCandidate] = useDeleteJobCandidateMutation()
	const currentJobCandidates = candidateJobs?.candidates || [];
	const [currentPage, setCurrentPage] = useState(1);
	const recordPerge = 8;
	const lastIndex = currentPage * recordPerge;
	const firstIndex = lastIndex - recordPerge;
	const records = currentJobCandidates.slice(firstIndex, lastIndex);
	const numberPage = Math.ceil(currentJobCandidates.length / recordPerge);
	const numbers = [...Array(numberPage + 1).keys()].slice(1);

	const handleDelete = async (_id) => {
		try {

			if (confirm('Are you sure you want to delete')) {
				await deleteJobCandidate(_id);
			}

		} catch (error) {
			console.log('error', error);
		}
	}

	return (
		<div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
			<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
				<Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
				<small>/</small>
				<span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Manage Jobs</span>
			</h1>
			<div className="mt-10 w-full lg:w-[30%]">
				<input className="w-full p-3 rounded shadow outline-[#007bff] " type="text" placeholder="search for job title"
					onChange={(e) => setSearchJobCandidate(e.target.value)} />
			</div>
			<div className="w-full mt-7 overflow-auto bg-white shadow rounded p-2">
				<table className="w-full">
					<thead>
						<tr className="text-white text-base text-start space-x-2 bg-[#007bff]">
							<td className="p-2">J_seeker_name</td>
							<td className="p-2">J_seeker_email</td>
							<td className="p-2">J_title</td>
							<td className="p-2">J_Category</td>
							<td className="p-2">J_Resume</td>
							<td className="p-2">J_status</td>
							<td className="p-2">Actions</td>
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
											<img className="w-16 h-16 rounded-md" src={`../../../public/uploads/${res?.jobSeekerResume}`} alt="" />
										</td>
										<td className="p-2 text-base ">{res?.jobOfferStatus}</td>
										<td className="p-2">
											<div className="text-base flex flex-row justify-center items-center gap-2">
											<Link to={`/Dashboard/view_job_detail/${res?._id}`} state={res}><GrFormView className="inline cursor-pointer" size={20} /></Link>
											<Link to={`/Dashboard/job_offer/${res?._id}`} state={res}><BiSolidEditAlt className="text-[#007bff] cursor-pointer inline" size={20} /></Link>
											<TiDelete className="inline text-red-500 cursor-pointer" size={20}
												onClick={() => handleDelete(res?._id)} />
											</div>
										</td>
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
								className="bg-[#007bff] hover:bg-blue-600 px-3 py-2 text-[#F7F5F5] rounded  shadow-lg"
							>
								previous
							</button>
						</li>
						{numbers.map((page, index) => {
							return (
								<li
									key={index}
									className={`${currentPage === page
										? "bg-[#007bff] rounded px-3 py-1  text-[#F7F5F5] text-lg "
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
								className="bg-[#007bff] hover:bg-blue-600 px-3 py-2  text-[#F7F5F5] rounded shadow-lg"
							>
								Next
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
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

export default Job_candidates