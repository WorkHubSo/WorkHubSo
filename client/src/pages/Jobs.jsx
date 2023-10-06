import { Footer, Header } from '../index'
import { useGetJobOffersQuery } from '../redux/employer_redux/slices/Employer_job_offer'
import { MdLocationOn, MdOutlineAttachMoney } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { BiTime } from 'react-icons/bi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Jobs = () => {
  const [fullTimeChecked, setFullTimeChecked] = useState(false);
  const [partTimeChecked, setPartTimeChecked] = useState(false);
  const [freelanceChecked, setFreelanceChecked] = useState(false);
  const [interneshipChecked, setInterneshipChecked] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const { data: jobs = [] } = useGetJobOffersQuery();
  const job_lengths = jobs?.get_job_offer || []
  const read_jobs = jobs?.get_job_offer || []
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerge = 8;
  const lastIndex = currentPage * recordPerge;
  const firstIndex = lastIndex - recordPerge;
  const records = read_jobs.slice(firstIndex, lastIndex);
  const numberPage = Math.ceil(read_jobs.length / recordPerge);
  const numbers = [...Array(numberPage + 1).keys()].slice(1);
  const fullTime = records?.filter(res => res.typeEmployement == 'Full Time')
  const partTime = records?.filter(res => res.typeEmployement == 'Part Time')
  const interneship = records?.filter(res => res.typeEmployement == 'Internship')
  const freelance = records?.filter(res => res.typeEmployement == 'Freelance')


  const getfullTime = read_jobs.filter((res) => {
    if (fullTimeChecked) {
      return res.typeEmployement === 'Full Time';
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });


  const getPartTime = records.filter((res) => {
    if (partTimeChecked) {
      return res.typeEmployement === 'Part Time';
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });

  const getFreelance = records.filter((res) => {
    if (freelanceChecked) {
      return res.typeEmployement === 'Freelance';
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });


  const getInternship = records.filter((res) => {
    if (interneshipChecked) {
      return res.typeEmployement === 'Internship';
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });


  const getSalaryRange = records.filter((res) => {
    if (salaryRange) {
      return res.salary === salaryRange;
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });


  const getFilterCategory = records.filter((res) => {
    if (filterCategory) {
      return res.category === filterCategory;
    } else {
      return true; // Return all jobs if the checkbox is not checked
    }
  });



  return (
    <>
      <Header />
      <div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
        <h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
          <span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
          <small>/</small>
          <span className='text-black/70 text-xl tracking-widest font-semibold'>Jobs</span>
        </h1>
        <div className='mt-5 p-5 bg-[#007bff] md:p-10 shadow rounded'>
          <p className=' text-white text-center text-xl lg:text-3xl tracking-widest font-semibold'>{job_lengths.length} <span className='ml-4'>Job offer Founds</span></p>
        </div>
        <div className='w-full p-1 md:p-5 flex flex-col lg:flex-row justify-start items-start gap-4'>
          <div className='w-full lg:w-[25%] h-fit static p-2 flex flex-col justify-start items-start gap-2 space-y-4'>

            <div className='w-full space-y-3'>
              <h1 className=' text-xl tracking-widest font-medium'>Category</h1>
              <select name="" id="" className='w-full p-3 mt-3 rounded shadow-md'
                onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">-select category--</option>
                <option value="Technology and IT">Technology and IT</option>
                <option value="Finance and Accounting">Finance and Accounting</option>
                <option value="Healthcare and Medicine">Healthcare and Medicine</option>
                <option value="Sales and Marketing">Sales and Marketing</option>
                <option value="Education and Teaching">Education and Teaching</option>
                <option value="Creative Arts and Design">Creative Arts and Design</option>
                <option value="Administrative and Clerical">Administrative and Clerical</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Hospitality and Tourism">Hospitality and Tourism</option>
              </select>
            </div>

            <div className='w-full space-y-4'>
              <h1 className=' text-xl tracking-widest font-medium'>Vacancy Type</h1>
              <div className='w-full'>
                <input type="checkbox" name='fullTime' checked={fullTimeChecked} id="fullTime"
                  onChange={(e) => setFullTimeChecked(e.target.checked)} />
                <span className=' ml-4'>Full Time  (<small className='ml-1'>{fullTime?.length}</small> )</span>
              </div>
              <div className='w-full'>
                <input type="checkbox" name="partTime" checked={partTimeChecked} id="partTime"
                  onChange={(e) => setPartTimeChecked(e.target.checked)} />
                <span className=' ml-4'>Part Time  (<small className='ml-1'>{partTime?.length}</small> )</span>
              </div>
              <div className='w-full'>
                <input type="checkbox" name="internership" checked={interneshipChecked} id="internership"
                  onChange={(e) => setInterneshipChecked(e.target.checked)} />
                <span className=' ml-4'>Internership  (<small className='ml-1'>{interneship?.length}</small> )</span>
              </div>
              <div className='w-full'>
                <input type="checkbox" name="freelance" checked={freelanceChecked} id="freelance"
                  onChange={(e) => setFreelanceChecked(e.target.checked)} />
                <span className=' ml-4'>Freelance  (<small className='ml-1'>{freelance?.length}</small> )</span>
              </div>

            </div>

            <div className='w-full space-y-3'>
              <h1 className=' text-xl tracking-widest font-medium'>Salary Range</h1>
              <div className='w-full'>
                <input type="range" name="salary" id="salary" onChange={(e) => setSalaryRange(e.target.value)} />
              </div>
            </div>

          </div>

          <div className='w-full p-4 bg-white shadow-md rounded-md'>
            {
              records?.map(res => {
                return (
                  fullTimeChecked || partTimeChecked || freelanceChecked || interneshipChecked || filterCategory? "" : <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                )
              })
            }

            {
              fullTimeChecked && getfullTime?.map((res) => {
                // Render the job item for full-time jobs
                return (
                  // Render the job item
                  <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                );
              })
            }


            {
              partTimeChecked && getPartTime?.map((res) => {
                // Render the job item for full-time jobs
                return (
                  // Render the job item
                  <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                );
              })
            }


            {
              freelanceChecked && getFreelance?.map((res) => {
                // Render the job item for full-time jobs
                return (
                  // Render the job item
                  <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                );
              })
            }


            {
              interneshipChecked && getInternship?.map((res) => {
                // Render the job item for full-time jobs
                return (
                  // Render the job item
                  <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                );
              })
            }


            {
              filterCategory && getFilterCategory?.map((res) => {
                // Render the job item for full-time jobs
                return (
                  // Render the job item
                  <Link to={`/Job_detail/${res?._id}`} className='mt-5 flex flex-col justify-start items-start gap-2 space-y-3' key={res?._id} state={res}>
                    <div className='w-full flex flex-row justify-start items-center gap-5 '>
                      <img className='w-20 h-20 bg-center object-cover rounded-[100%]' src={`../../public/uploads/${res?.cover}`} alt="" />
                      <div className='flex flex-col justify-start items-start gap-1'>
                        <p className='text-lg md:text-xl tracking-widest font-medium'>{res?.jobTitle}</p>
                        <p className='text-base md:text-lg tracking-tighter font-normal text-black/60'>{res?.category}</p>
                      </div>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-3'>
                      <p className=' text-base tracking-tighter md:tracking-wider'>{res?.description?.substring(0, 200)}.</p>
                      <div className='flex flex-col lg:flex-row justify-start gap-4'>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdLocationOn />{res?.location}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><CgCalendarDates />{res?.deadline?.substring(0, 10)}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><BiTime />{res?.typeEmployement}</p>
                        <p className='text-sm flex flex-row justify-start items-center gap-2'><MdOutlineAttachMoney />{res?.salary}</p>
                      </div>
                    </div>
                    <hr className='w-full border-[1px]' />
                  </Link>
                );
              })
            }

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
      </div>
      <Footer />
    </>
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

export default Jobs