import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

function Header() {
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
			<option value="Job Seeker">Job Seeker</option>
			<option value="/Job_seeker_signin">Sign in</option>
			<option value="/Job_seeker_signup">Sign up</option>
			<option value="/view_profile">View Profile</option>
			<option value="/Job_seeker_manage_profile">Manage Profile</option>
		</select>
	)
	const employerDropdown = (
		<select  className="p-2 rounded-md border-none outline-[#007bff]" value={selectEmployer}
		onChange={(e)=>handleselectEmployer(e)}>
			<option value="Employer">Employer</option>
			<option value="/Job_seeker_signin">Sign in</option>
			<option value="/Job_seeker_signup">Sign up</option>
			<option value="/Dashboard">Dashboard</option>
		</select>
	)
  return (
	<div className=" w-full lg:w-[80%] bg-[#f5f5f5] mx-auto fixed z-30 top-0 left-0 right-0 p-2">
		<div className="flex flex-col relative lg:flex-row justify-between items-center gap-1">
			<div className="w-full flex justify-start relative items-center gap-3">
				<img className="w-36 h-24" src="logo1.svg" alt="" />
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