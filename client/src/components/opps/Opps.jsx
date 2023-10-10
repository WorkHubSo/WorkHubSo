import { Link } from "react-router-dom"

const Opps = () => {
  return (
	<div className='w-[90%] md:w-[80%] mx-auto p-4 mt-32 lg:mt-20'>
		<Link to='/' className="p-3 px-10 rounded-md shadow-md bg-[#007bff] text-white">Back To Home</Link>
		<img className=" mt-10 w-full h-screen" src='../../../public/images/opps.jpg' alt="" />
	</div>
  )
}

export default Opps