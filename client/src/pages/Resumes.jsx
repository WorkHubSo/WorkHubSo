import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../index';
import { useGetJobSeekersQuery } from '../redux/job_seeker_redux/slices/job_seeker_slice';
const Resumes = () => {
  const { data: jobSeeker = [] } = useGetJobSeekersQuery();
  const jobSeekerUsers = jobSeeker?.user || []
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerge =8;
  const lastIndex = currentPage * recordPerge;
  const firstIndex = lastIndex - recordPerge;
  const records = jobSeekerUsers.slice(firstIndex, lastIndex);
  const numberPage = Math.ceil(jobSeekerUsers.length / recordPerge);
  const numbers = [...Array(numberPage + 1).keys()].slice(1);
  return (
    <>
      <Header />
      <div className='w-[90%] md:w-[80%] mx-auto p-4 mt-40 lg:mt-28'>
        <h1 className="w-full ml-2 flex flex-row justify-start items-start gap-4">
          <span className="text-[#007bff] text-xl tracking-widest font-semibold">Home</span>
          <small>/</small>
          <span className='text-black/70 text-xl tracking-widest font-semibold'>Resumes</span>
        </h1>
        <div className='mt-5 p-5 bg-[#007bff] md:p-10 shadow rounded'>
          <p className=' text-white text-center text-3xl tracking-widest font-semibold'>{jobSeeker?.user?.length} <span className='ml-4'>Resumes Found</span></p>
          <Formik>
            <Form className='mt-5 text-lg tracking-tighter grid grid-cols-1 lg:grid-cols-3 justify-start items-center gap-3'>
              <Field className='p-3 rounded shadow outline-white' type="text" placeholder='Search Resumes' />
              <Field className='p-3 rounded shadow outline-white' type="text" placeholder='Select category' />
              <button className='p-3 shadow rounded bg-black text-white' type='submit'>Search</button>
            </Form>
          </Formik>
        </div>
        <div className='bg-white p-5 lg:p-10 w-full mt-10 flex flex-col justify-start items-start gap-3'>
          {
            records?.map(res => {
              return (
                <Link to={`/Resume_detail/${res?._id}`} className='w-full flex flex-col justify-start items-start gap-5 ' key={res?._id} state={res}>
                  <div className='w-full flex flex-col lg:flex-row justify-start items-center gap-5'>
                    {
                      res?.photo ? <img className=' w-16 h-16 object-center bg-cover rounded-[100%]' src={`../../public/uploads/${res?.photo}`} alt="" /> : ''
                    }
                    <p className=' text-xl font-medium tracking-tighter'>{res?.fullName}</p>
                  </div>
                    <p className='text-justify lg:text-start text-sm font-medium tracking-tighter lg:tracking-widest'>{res?.aboutMe?.substring(0, 250)}</p>
                    <p className=' flex flex-row justify-start items-center gap-2'>
                    <MdLocationOn  size={16} className='inline text-black/70'/>
                    <span>{res?.address}</span>
                    </p>
                    <hr className='w-full border-2' />
                </Link>
              )
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
                className={`${
                  currentPage === page
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

export default Resumes