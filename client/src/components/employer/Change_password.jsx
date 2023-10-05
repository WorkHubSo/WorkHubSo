import { Link } from "react-router-dom"

const Change_password = () => {
	return (
		<div className='mt-16 lg:mt-44 w-full lg:w-[90%]  lg:ml-[30%]'>
			<h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
				<Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
				<small>/</small>
				<span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Change Password</span>
			</h1>
		</div>
	)
}

export default Change_password