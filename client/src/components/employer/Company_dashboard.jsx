import { Link } from "react-router-dom"
import { useGetCurrentJobOffersQuery } from "../../redux/employer_redux/slices/Employer_job_offer"

const Company_dashboard = () => {
  const { data: jobs = [] } = useGetCurrentJobOffersQuery();
  const legnth_current_jobs = jobs?.get_job_offer || [];
  return (
    <div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
      <h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
        <Link to='/' className="text-[#007bff] lg:text-xl tracking-widest font-semibold">Home</Link>
        <small>/</small>
        <span className='text-black/70 text-base lg:text-xl tracking-widest font-semibold'><Link className="inline" to='/Dashboard'>Dashboard</Link> / Company Dashboard</span>
      </h1>
      <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="px-10 py-14 rounded-md shadow-md bg-[#007bff]">
          <p className="text-center text-white text-xl tracking-wider">JOBS <span className="ml-4">{legnth_current_jobs.length}</span></p>
        </div>

        <div className="px-10 py-14 rounded-md shadow-md bg-black">
          <p className="text-center text-white text-xl tracking-wider">Applicants</p>
        </div>
      </div>
    </div>
  )
}

export default Company_dashboard