import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { SiWorkplace } from "react-icons/si"

function Header() {
	const [ showScroll , setShowScroll ] = useState(false)
	useEffect(()=> {
		const handle_window_scroll = () => {

			if(window.scrollY > 0){
				setShowScroll(true)
			}else{
				setShowScroll(false)
			}
		}
		window.addEventListener('scroll',handle_window_scroll)
		return () => window.removeEventListener('scroll',handle_window_scroll)
	},[])
	const [ showMenu , setShowMenu ] = useState(true);
	const [ selectJobSeeker , setselectJobSeeker] = useState('');
	const [ selectEmployer , setselectEmployer] = useState('');
	const navigate = useNavigate();
	const hideShowMenu = () => {
		setShowMenu(!showMenu)
	}
	const handleselectJobSeeker = (e)=>{
		const selectJobSeekerValue = e.target.value
		setselectJobSeeker(selectJobSeekerValue)
		navigate(selectJobSeekerValue)
		setTimeout(()=>{
			hideShowMenu()
		},1000)
	}
	const handleselectEmployer = (e)=>{
		const selectEmployerValue = e.target.value
		setselectEmployer(selectEmployerValue)
		navigate(selectEmployerValue)
		setTimeout(()=>{
			hideShowMenu()
		},1000)
	}
	const jobSeekerDropdown = (
		<select className="p-2 rounded-md border-none outline-[#007bff]" value={selectJobSeeker} 
		onChange={(e)=>handleselectJobSeeker(e)}>
			<option value="">Job Seeker</option>
			<option value="/Job_seeker_signin">Sign in</option>
			<option value="/Job_seeker_signup">Sign up</option>
			<option value="/View_job_seeker_profile">View Profile</option>
			<option value="/Job_seeker_manage_profile">Manage Profile</option>
			<option value="/Applied_jobs">Applied Jobs</option>
		</select>
	)
	const employerDropdown = (
		<select  className="p-2 rounded-md border-none outline-[#007bff]" value={selectEmployer}
		onChange={(e)=>handleselectEmployer(e)}>
			<option value="">Employer</option>
			<option value="/Employer_signin">Sign in</option>
			<option value="/Employer_signup">Sign up</option>
			<option value="/Dashboard">Dashboard</option>
		</select>
	)
  return (
	<div className={`${showScroll ? 'shadow bg-[#f5f5f5]' : ''}w-full bg-[#f5f5f5] mx-auto fixed z-30 top-0 left-0 right-0 p-4`}>
		<div className="w-[90%] lg:w-[80%] mx-auto flex flex-col relative lg:flex-row justify-between items-center gap-1">
			<div className="w-full flex justify-start relative items-center gap-3">
				<h1 className=" text-xl tracking-tighter"><SiWorkplace size={40} className="inline text-[#007bff]"/>ork<span className="text-[#333333]">Hubso</span></h1>
				{
					showMenu ? <AiOutlineMenu size={25} className="lg:hidden block absolute right-5" onClick={()=>setShowMenu(!showMenu)}/> 
					: <AiOutlineClose size={25} className="lg:hidden block absolute right-5" onClick={()=>setShowMenu(!showMenu)}/> 
				}
			</div>
			<ul className={`font-medium capitalize text-lg flex flex-col lg:flex-row justify-start items-center gap-7
			${showMenu ? 'hidden lg:flex lg:flex-row' : 'block h-screen lg:h-fit'}`}>
				<Link to='/' onClick={()=>hideShowMenu()}>Home</Link>
				<Link to='/Jobs' onClick={()=>hideShowMenu()}>Jobs</Link>
				<Link to='/Resumes' onClick={()=>hideShowMenu()}>Resumes</Link>
				<Link to='/Contact' onClick={()=>hideShowMenu()}>Contact</Link>
				<Link to='/About' onClick={()=>hideShowMenu()}>About</Link>
				<span className="lg:ml-5 flex flex-col lg:flex-row justify-evenly items-center gap-5">
					{jobSeekerDropdown}
					{employerDropdown}
				</span>
			</ul>
		</div>
	</div>
  )
}

export default Header