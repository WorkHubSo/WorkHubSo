const Navbar = () => {
  return (
	<div className="w-[80%] mx-auto p-4 h-screen mt-40 lg:mt-28">
		<div className="w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-3">
			<div className="w-full lg:w-fit mt-[-30px] flex flex-col justify-start items-start space-y-10 gap-5">
				<h1 className="text-2xl md:text-4xl  tracking-widest">Search for a job ?</h1>
				<h3 className="text-2xl md:text-3xl mt-3 tracking-widest">Find the best startup job that fit you</h3>
				<div className="bg-white p-3 rounded-md shadow-md w-full flex flex-col md:flex-row justify-start items-center gap-2">
					<input className="py-2 px-3 w-full md:w-fit outline-[#007bff] rounded" type="text" placeholder="Job title or keywords" />
					<input className="py-2 px-3 w-full md:w-fit outline-[#007bff]" type="text" placeholder="Locations" />
					<button className="py-2 px-5 w-full md:w-fit rounded bg-[#007bff] text-white">Search</button>
				</div>
			</div>
			<img className="w-full lg:w-fit bg-cover object-center" src="images/navbar.png" alt="" />
		</div>
	</div>
  )
}

export default Navbar