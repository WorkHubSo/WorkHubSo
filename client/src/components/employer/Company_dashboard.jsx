import { useGetCurrentJobOffersQuery, useGetJobOffersByIdQuery } from "../../redux/employer_redux/slices/Employer_job_offer"

const Company_dashboard = () => {
  const { data: jobs = [] } = useGetCurrentJobOffersQuery();
  const legnth_current_jobs = jobs?.get_job_offer || [];


  const {data: applications = []} = useGetJobOffersByIdQuery();

  const legnth_current_applications = applications?.get || [];
  return (
    <div className="mt-16 lg:mt-32 w-full lg:w-[90%]  lg:ml-[30%]">
      
      <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="px-10 py-14 rounded-md shadow-md bg-HeadingColor">
          <p className="text-center text-white text-xl tracking-wider">JOBS <span className="ml-4">{legnth_current_jobs.length}</span></p>
        </div>

        <div className="px-10 py-14 rounded-md shadow-md bg-primaryColor">
          <p className="text-center text-white text-xl tracking-wider">Applicants <span className="ml-4">{legnth_current_applications.length}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Company_dashboard