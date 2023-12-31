import { Link } from "react-router-dom"
import { GrFormView } from "react-icons/gr"
import { TiDelete } from "react-icons/ti"
import { BiSolidEditAlt } from "react-icons/bi"
import { useDeleteJobOfferMutation, useGetCurrentJobOffersQuery } from "../../redux/employer_redux/slices/Employer_job_offer";
import { useState } from "react";

const Manage_jobs = () => {
	const [serachJobTitle, setSearchJobTitle] = useState('');
	const { data: currentjobs = [] } = useGetCurrentJobOffersQuery();
	const [deleteJobOffer] = useDeleteJobOfferMutation();

	const data = currentjobs?.get_job_offer || [];
	const [currentPage, setCurrentPage] = useState(1);
	const recordPerge = 8;
	const lastIndex = currentPage * recordPerge;
	const firstIndex = lastIndex - recordPerge;
	const records = data.slice(firstIndex, lastIndex);
	const numberPage = Math.ceil(data.length / recordPerge);
	const numbers = [...Array(numberPage + 1).keys()].slice(1);

	const handleDelete = async (_id) => {
		try {

			if (confirm('Are you sure you want to delete')) {
				await deleteJobOffer(_id);
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
					onChange={(e) => setSearchJobTitle(e.target.value)} />
			</div>
			<div className="w-full mt-7 overflow-auto bg-white shadow rounded p-2">
				<table className="w-full">
					<thead>
						<tr className="text-white text-base text-start space-x-2 bg-[#007bff]">
							<td className="p-2">J_title</td>
							<td className="p-2 hidden md:block">Category</td>
							<td className="p-2">T_employement</td>
							<td className="p-2">Exp_level</td>
							<td className="p-2">Req_experience</td>
							<td className="p-2 hidden md:block">Deadline</td>
							<td className="p-2">Salary</td>
							<td className="p-2">Actions</td>
						</tr>
					</thead>
					<tbody>
						{
							records?.filter(res => {
								return res?.jobTitle.toLowerCase().includes(serachJobTitle.toLowerCase());
							})?.map(res => {
								return (

									<tr key={res?._id} className="w-full space-x-2 border-b-[3px] border-b-[#f5f5f9]">
										<td className="p-2 text-base">{res?.jobTitle}</td>
										<td className="p-2 text-base hidden md:block">{res?.category}</td>
										<td className="p-2 text-base">{res?.typeEmployement}</td>
										<td className="p-2 text-base">{res?.experienceLevel}</td>
										<td className="p-2 text-base">{res?.requiredExperience}</td>
										<td className="p-2 text-base hidden md:block">{res?.deadline.substring(0, 10)}</td>
										<td className="p-2 text-base">{res?.salary}</td>
										<td className="p-2 text-base flex flex-row justify-center items-center gap-2">
											<Link to={`/Dashboard/view_job_detail/${res?._id}`} state={res}><GrFormView className="inline cursor-pointer" size={20} /></Link>
											<Link to={`/Dashboard/job_offer/${res?._id}`} state={res}><BiSolidEditAlt className="text-[#007bff] cursor-pointer inline" size={20} /></Link>
											<TiDelete className="inline text-red-500 cursor-pointer" size={20}
												onClick={() => handleDelete(res?._id)} />
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

export default Manage_jobs