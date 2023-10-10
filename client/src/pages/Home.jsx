import { Link } from 'react-router-dom';
import { Footer, Header, Navbar } from '../index'
import { useGetJobOffersQuery } from '../redux/employer_redux/slices/Employer_job_offer'
import { MdAppRegistration, MdCastForEducation, MdCoffee, MdLocationOn, MdOutlineAttachMoney, MdOutlineCloudUpload } from 'react-icons/md';
import { CgCalendarDates, CgProfile } from 'react-icons/cg';
import { BiTime } from 'react-icons/bi';
import { SiMaterialdesign, SiSalesforce } from 'react-icons/si';
import { AiFillAccountBook, AiOutlineMedicineBox } from 'react-icons/ai';
import { GrResources, GrTechnology } from 'react-icons/gr';
import { LiaHospitalSolid } from 'react-icons/lia';
import { RiAdminFill } from 'react-icons/ri';
const Home = () => {

	const { data: jobs = [] } = useGetJobOffersQuery();
	const fetchJobs = jobs?.get_job_offer || [];
	const itJobs = fetchJobs?.filter(res => res.category == 'Technology and IT')
	const financeJobs = fetchJobs?.filter(res => res.category == 'Finance and Accounting')
	const healthJobs = fetchJobs?.filter(res => res.category == 'Healthcare and Medicine')
	const saleJobs = fetchJobs?.filter(res => res.category == 'Sales and Marketing')
	const educationJobs = fetchJobs?.filter(res => res.category == 'Education and Teaching')
	const creativeJobs = fetchJobs?.filter(res => res.category == 'Creative Arts and Design')
	const administrativeJobs = fetchJobs?.filter(res => res.category == 'Administrative and Clerical')
	const humanResourceJobs = fetchJobs?.filter(res => res.category == 'Human Resources')
	const hospitalityJobs = fetchJobs?.filter(res => res.category == 'Hospitality and Tourism')

	return (
		<>
			<Header />
			<div>
				<Navbar />
				<div className='w-full p-5 lg:p-10 mt-14'>
					<h1 className='mt-4 text-center text-xl tracking-wide md:text-3xl md:tracking-widest'> Popular Job Categories </h1>
					<div className='mt-10 w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out hover:scale-105 duration-500 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<GrTechnology className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Technology and IT</p>
							<p className='text-base tracking-tighter'>Jobs ( {itJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out  hover:scale-105 duration-500 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<AiFillAccountBook className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Finance and Accounting</p>
							<p className='text-base tracking-tighter'>Jobs ( {financeJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out hover:scale-105 duration-500 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<AiOutlineMedicineBox className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Healthcare and Medicine</p>
							<p className='text-base tracking-tighter'>Jobs ( {healthJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<SiSalesforce className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Sales and Marketing</p>
							<p className='text-base tracking-tighter'>Jobs ( {saleJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<MdCastForEducation className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Education and Teaching</p>
							<p className='text-base tracking-tighter'>Jobs ( {educationJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<SiMaterialdesign className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Creative Arts and Design</p>
							<p className='text-base tracking-tighter'>Jobs ( {creativeJobs?.length} ) </p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 bg-white shadow-md rounded-md hover:scale-105 hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<RiAdminFill className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Administrative and Clerical</p>
							<p className='text-base tracking-tighter'>Jobs ( {administrativeJobs?.length} )</p>
						</div>


						<div className='px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<GrResources className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} color='white' />
							<p className='text-lg font-medium  tracking-tighter'>Human Resources</p>
							<p className='text-base tracking-tighter'>Jobs ( {humanResourceJobs?.length} )</p>
						</div>


						<div className=' px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-black/70 flex flex-col justify-center items-center space-y-4'>
							<LiaHospitalSolid className='bg-[#007bff] w-20 h-14 text-white rounded-md' size={35} />
							<p className='text-lg font-medium  tracking-tighter'>Hospitality and Tourism</p>
							<p className='text-base tracking-tighter'>Jobs ( {hospitalityJobs?.length} )</p>
						</div>

					</div>
				</div>
			</div>

			<div className='w-full p-5 lg:p-10 mt-10'>
				<h1 className='mt-4 text-center text-xl tracking-wide md:text-3xl md:tracking-widest'> Features Jobs </h1>
				<div className=' mt-10 w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 '>
					{
						fetchJobs?.map(res => {
							return (
								<Link to={`/Job_detail/${res?._id}`} className='p-3 hover:bg-[#007bff] hover:text-white hover:shadow-md hover:rounded transition-all ease-in-out duration-500
								 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
									<div className='w-full flex flex-col lg:flex-row justify-start items-start lg:items-center gap-5 '>
										<img className='w-full lg:w-32 lg:h-20 bg-cover object-center lg:rounded-[10%]' src={`../../public/uploads/${res?.cover}`} alt="" />
										<div className='flex flex-col justify-start items-start gap-1'>
											<p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
											<p className='text-base md:text-lg tracking-tighter font-normal'>{res?.category}</p>
										</div>
									</div>
									<div className='w-full flex flex-col justify-start items-start gap-3'>
										<div dangerouslySetInnerHTML={{ __html: res?.description?.substring(0, 200) }} />
										{/* <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p> */}
										<div className='flex flex-col lg:flex-row justify-start gap-4'>
											<p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
											<p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
											<p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
											<p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
										</div>
									</div>
								</Link>
							)
						})
					}
				</div>
			</div>

			<div className='w-[80%] mx-auto  mt-14 p-5 lg:p-10'>

				<h1 className='mt-4 text-center text-xl tracking-wide md:text-3xl md:tracking-widest'> How It Work</h1>

				<div className='w-full mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-start items-start'>
					<div className='w-full flex flex-col justify-center items-center gap-3 space-y-3'>
						<h4 className=' text-base tracking-tighter'>Fist Step</h4>
						<p className='p-5 rounded-[100%] border-2'><MdAppRegistration size={45} className='text-[#007bff]' /></p>
						<p className=' text-xl'>Register With Us </p>
					</div>
					<div className='w-full flex flex-col justify-center items-center gap-3 space-y-3'>
						<h4 className=' text-base tracking-tighter'>Second Step</h4>
						<p className='p-5 rounded-[100%] border-2'><CgProfile size={45} className='text-[#007bff]' /></p>
						<p className=' text-xl'>Create Your Profile</p>
					</div>
					<div className='w-full flex flex-col justify-center items-center gap-3 space-y-3'>
						<h4 className=' text-base tracking-tighter'>Third Step</h4>
						<p className='p-5 rounded-[100%] border-2'><MdOutlineCloudUpload size={45} className='text-[#007bff]' /></p>
						<p className=' text-xl'>Upload Your Resume</p>
					</div>
					<div className='w-full flex flex-col justify-center items-center gap-3 space-y-3'>
						<h4 className=' text-base tracking-tighter'>Now It`s Our Turn</h4>
						<p className='p-5 rounded-[100%] border-2'><MdCoffee size={45} className='text-[#007bff]' /></p>
						<p className=' text-xl'>Now Take a rest</p>
					</div>
				</div>
			</div>


			<div className='w-full mt-14 p-5 lg:p-10'>
				<h1 className='mt-4 text-black text-center text-xl tracking-wide md:text-3xl md:tracking-widest'> Our Trusted Partners 😊 👍</h1>

				<div className='mt-20 w-[90%] lg:w-[80%] mx-auto 
				grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
				justify-start items-center gap-5'>
					<div className='w-full'>
						<img className='w-[80%] mx-auto' src="../../public/images/mybank.png" alt="" />
					</div>
					<div className='w-full'>
						<img className='w-[80%] mx-auto' src="../../public/images/ibs.svg" alt="" />
					</div>
					<div className='w-full'>
						<img className='w-[80%] mx-auto' src="../../public/images/Hormuud.svg" alt="" />
					</div>
					<div className='w-full'>
						<img className='w-[80%] mx-auto' src="../../public/images/somtelLogo.png" alt="" />
					</div>
				</div>
			</div>



			<div className='w-full mt-14 p-5 lg:p-10'>
				<h1 className='mt-4 text-black text-center text-xl tracking-wide md:text-3xl md:tracking-widest'>Subscribe Our Newsletter!</h1>
				<div className='mt-10 w-[90%] lg:w-[80%] mx-auto'>
					<p className=' text-base text-justify md:text-lg lg:tracking-widest md:text-center leading-10'>Stay connected with us and never miss out on the latest updates, exclusive offers, and valuable insights. Subscribe to our newsletter and be the first to know about new job opportunities, industry trends, and career resources. Don`t wait, join our community today</p>
					<div className='flex flex-col lg:flex-row justify-center items-center p-4 gap-4'>
						<input className='w-full lg:w-[40%] p-3 rounded shadow outline-[#007bff]' type="email" placeholder='@eg-> miirshe@gmail.com' />
						<button className='w-full lg:w-[20%] p-3 rounded shadow bg-[#007bff] 
						hover:bg-white hover:text-[#007bff] text-white transition-all ease-in-out duration-500'>subscribe</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Home