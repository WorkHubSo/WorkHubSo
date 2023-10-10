import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { SiWorkplace } from "react-icons/si"
import Cookies from "js-cookie"
import { useGetCurrentJobSeekerQuery } from "../../redux/job_seeker_redux/slices/job_seeker_slice"
import { useGetCurrentEmployerAuthQuery } from "../../redux/employer_redux/slices/Employer_auth_slice"
import { toast } from "react-toastify"
import { BiLogOutCircle } from "react-icons/bi"

function Header() {
	const { data : jobSeekerAuth = [] } = useGetCurrentJobSeekerQuery()
	const currentJobSeeker = jobSeekerAuth?.user || []
	const { data : employerAuth = [] } = useGetCurrentEmployerAuthQuery()
	const currentEmployer = employerAuth?.employer || []
	const [showScroll, setShowScroll] = useState(false)
	const getEmployerToken = Cookies.get('employerToken')
	const getJobSeekerToken = Cookies.get('jobSeekerToken')
	const [employerToken, setEmployerToken] = useState(false);
	const [jobSeekerToken, setJobSeekerToken] = useState(false);

	useEffect(() => {
		if (getEmployerToken) {
			setEmployerToken(true);
		} else {
			setEmployerToken(false)
		}
	}, [])
	useEffect(() => {
		if (getJobSeekerToken) {
			setJobSeekerToken(true);
		} else {
			setJobSeekerToken(false)
		}
	}, [])

	useEffect(() => {
		const handle_window_scroll = () => {

			if (window.scrollY > 0) {
				setShowScroll(true)
			} else {
				setShowScroll(false)
			}
		}
		window.addEventListener('scroll', handle_window_scroll)
		return () => window.removeEventListener('scroll', handle_window_scroll)
	}, [])
	const [showMenu, setShowMenu] = useState(true);
	const [selectJobSeeker, setselectJobSeeker] = useState('');
	const [selectEmployer, setselectEmployer] = useState('');
	const navigate = useNavigate();
	const hideShowMenu = () => {
		setShowMenu(!showMenu)
	}
	const handleselectJobSeeker = (e) => {
		const selectJobSeekerValue = e.target.value
		setselectJobSeeker(selectJobSeekerValue)
		navigate(selectJobSeekerValue)
		setTimeout(() => {
			hideShowMenu()
		}, 1000)
	}
	const handleselectEmployer = (e) => {
		const selectEmployerValue = e.target.value
		setselectEmployer(selectEmployerValue)
		navigate(selectEmployerValue)
		setTimeout(() => {
			hideShowMenu()
		}, 1000)
	}

	const handleLogout = () => {
		Cookies.remove('jobSeekerToken')
		toast.success('successfully log out')
		window.location.reload();
		navigate('/')
	}

	const jobSeekerDropdown = (
		<select className="p-2 rounded-md border-none outline-[#007bff] text-black" value={selectJobSeeker}
			onChange={(e) => handleselectJobSeeker(e)}>
			<option value="">
				{
					jobSeekerToken == true ? currentJobSeeker?.fullName : 'Job Seeker'
				}
			</option>
			{
				jobSeekerToken == false ?
					<>
						<option value="/Job_seeker_signin">Sign in</option>
						<option value="/Job_seeker_signup">Sign up</option>
					</>
					: " "
			}
			{
				jobSeekerToken == true ?
					<>
						<option value="/View_job_seeker_profile">View Profile</option>
						<option value="/Job_seeker_manage_profile">Manage Profile</option>
						<option value="/Applied_jobs">Applied Jobs</option>
					</>
					: " "
			}
		</select>
	)
	const employerDropdown = (
		<select className="p-2 rounded-md border-none outline-[#007bff]" value={selectEmployer}
			onChange={(e) => handleselectEmployer(e)}>
			<option value="">
				{
					employerToken == true ? currentEmployer.companyName : 'Employer'
				}
			</option>
			{
				employerToken == false ?
					<>
						<option value="/Employer_signin">Sign in</option>
						<option value="/Employer_signup">Sign up</option>
					</> : " "
			}
			{
				employerToken ? <option value="/Dashboard">Dashboard</option>
					: " "
			}

		</select>
	)
	return (
		<div className={`w-full bg-[#f5f5f5] mx-auto fixed z-30 top-0 left-0 right-0 p-4${showScroll ? 'shadow-md bg-[#f5f5f5] p-4 z-30 border-2 ' : ''}`}>
			<div className="w-[90%] lg:w-[80%] mx-auto flex flex-col relative lg:flex-row justify-between items-center gap-1">
				<div className="w-full flex justify-start relative items-center gap-3">
					<h1 className=" text-xl tracking-tighter text-black"><SiWorkplace size={40} className="inline text-[#007bff]" />ork<span>Hubso</span></h1>
					{
						showMenu ? <AiOutlineMenu size={25} className="lg:hidden block absolute right-5" onClick={() => setShowMenu(!showMenu)} />
							: <AiOutlineClose size={25} className="lg:hidden block absolute right-5" onClick={() => setShowMenu(!showMenu)} />
					}
				</div>
				<ul className={`font-medium capitalize text-lg flex flex-col lg:flex-row justify-start items-center gap-7
			${showMenu ? 'hidden lg:flex lg:flex-row' : 'block h-screen lg:h-fit'}`}>
					<Link to='/' onClick={() => hideShowMenu()}>Home</Link>
					<Link to='/Jobs' onClick={() => hideShowMenu()}>Jobs</Link>
					<Link to='/Resumes' onClick={() => hideShowMenu()}>Resumes</Link>
					<Link to='/Contact' onClick={() => hideShowMenu()}>Contact</Link>
					<Link to='/About' onClick={() => hideShowMenu()}>About</Link>
					<span className="lg:ml-5 flex flex-col lg:flex-row justify-evenly items-center gap-5">
						{
							employerToken == true  ? " " : jobSeekerDropdown
						}
						{
							jobSeekerToken == true ? " " : employerDropdown
						}
					</span>
					{
						jobSeekerToken ? <BiLogOutCircle onClick={()=>handleLogout()} size={30} className=" cursor-pointer text-[#007bff] inline"/> : " "
					}
				</ul>
			</div>
		</div>
	)
}

export default Header