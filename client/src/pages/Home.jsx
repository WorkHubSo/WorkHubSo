import { Footer, Header, Navbar } from "../index";
import { useGetJobOffersQuery } from "../redux/employer_redux/slices/Employer_job_offer";
import {
  MdAppRegistration,
  MdCastForEducation,
  MdCoffee,

  MdOutlineCloudUpload,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { SiMaterialdesign, SiSalesforce } from "react-icons/si";
import { AiFillAccountBook } from "react-icons/ai";
import { GrTechnology } from "react-icons/gr";
import { LiaHospitalSolid } from "react-icons/lia";
const Home = () => {
  const { data: jobs = [] } = useGetJobOffersQuery();
  const fetchJobs = jobs?.get_job_offer || [];
  const itJobs = fetchJobs?.filter(
    (res) => res.category == "Technology and IT"
  );
  const financeJobs = fetchJobs?.filter(
    (res) => res.category == "Finance and Accounting"
  );
  const saleJobs = fetchJobs?.filter(
    (res) => res.category == "Sales and Marketing"
  );
  const educationJobs = fetchJobs?.filter(
    (res) => res.category == "Education and Teaching"
  );
  const creativeJobs = fetchJobs?.filter(
    (res) => res.category == "Creative Arts and Design"
  );
  const hospitalityJobs = fetchJobs?.filter(
    (res) => res.category == "Hospitality and Tourism"
  );

  return (
    <>
      <Header />
      <div>
        <Navbar />
        <div className="w-full p-5 lg:p-10 mt-8 ">
          <h1 className="mt-4 text-center text-xl tracking-wide md:text-3xl md:tracking-widest">
            {" "}
            Popular Job Categories{" "}
          </h1>
          <div className="mt-10 w-[90%] lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="px-3 py-10 transition-all cursor-pointer ease-in-out hover:scale-105 duration-500 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <GrTechnology
                className="bg-primaryColor w-40 h-20 text-white rounded-md"
                size={35}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Technology and IT
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {itJobs?.length} )
              </p>
            </div>

            <div className="px-3 py-10 transition-all cursor-pointer ease-in-out  hover:scale-105 duration-500 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <AiFillAccountBook
                className="bg-primaryColor w-40 h-20 text-white rounded-md"
                size={35}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Finance and Accounting
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {financeJobs?.length} )
              </p>
            </div>

            <div className="px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <SiSalesforce
                className="bg-primaryColor w-40 h-20 text-white rounded-md p-3"
                size={30}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Sales and Marketing
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {saleJobs?.length} )
              </p>
            </div>

            <div className="px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <MdCastForEducation
                className="bg-primaryColor w-40 h-20 text-white rounded-md"
                size={35}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Education and Teaching
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {educationJobs?.length} )
              </p>
            </div>

            <div className="px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <SiMaterialdesign
                className="bg-primaryColor w-40 h-20 text-white rounded-md"
                size={35}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Creative Arts and Design
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {creativeJobs?.length} ){" "}
              </p>
            </div>

            <div className=" px-3 py-10 transition-all cursor-pointer ease-in-out duration-500 hover:scale-105 bg-white shadow-md rounded-md hover:text-HeadingColor flex flex-col justify-center items-center space-y-4">
              <LiaHospitalSolid
                className="bg-primaryColor w-40 h-20 text-white rounded-md"
                size={35}
              />
              <p className="text-lg font-medium  tracking-tighter">
                Hospitality and Tourism
              </p>
              <p className="text-base tracking-tighter">
                Jobs ( {hospitalityJobs?.length} )
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto  mt-14 p-5 lg:p-10">
        <h1 className="mt-4 text-center text-xl tracking-wide md:text-3xl md:tracking-widest">
          {" "}
          How It Work
        </h1>

        <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-start items-start">
          <div className="w-full flex flex-col justify-center items-center gap-3 space-y-3 ">
            <h4 className=" text-base tracking-tighter">Fist Step</h4>
            <p className="p-5 rounded-[100%] border-2 bg-white">
              <MdAppRegistration size={45} className="text-[#007bff]" />
            </p>
            <p className=" text-xl">Register With Us </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3 space-y-3">
            <h4 className=" text-base tracking-tighter">Second Step</h4>
            <p className="p-5 rounded-[100%] border-2 bg-white">
              <CgProfile size={45} className="text-[#007bff]" />
            </p>
            <p className=" text-xl">Create Your Profile</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3 space-y-3">
            <h4 className=" text-base tracking-tighter">Third Step</h4>
            <p className="p-5 rounded-[100%] border-2 bg-white">
              <MdOutlineCloudUpload size={45} className="text-[#007bff]" />
            </p>
            <p className=" text-xl">Upload Your Resume</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-3 space-y-3">
            <h4 className=" text-base tracking-tighter">Now It`s Our Turn</h4>
            <p className="p-5 rounded-[100%] border-2 bg-white">
              <MdCoffee size={45} className="text-[#007bff]" />
            </p>
            <p className=" text-xl">Now Take a rest</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-14 p-5 lg:p-10">
        <h1 className="mt-4 text-HeadingColor text-center text-xl tracking-wide md:text-3xl md:tracking-widest">
          {" "}
          Our Trusted Partners 😊 👍
        </h1>

        <div
          className="mt-20 w-[90%] lg:w-[80%] mx-auto 
				grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
				justify-start items-center gap-5"
        >
          <div className="w-full">
            <img
              className="w-[80%] mx-auto"
              src="../../public/images/mybank.png"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-[80%] mx-auto"
              src="../../public/images/ibs.svg"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-[80%] mx-auto"
              src="../../public/images/Hormuud.svg"
              alt=""
            />
          </div>
          <div className="w-full">
            <img
              className="w-[80%] mx-auto"
              src="../../public/images/somtelLogo.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-14 p-5 lg:p-10">
        <h1 className="mt-4 text-HeadingColor text-center text-xl tracking-wide md:text-3xl md:tracking-widest">
          Subscribe Our Newsletter!
        </h1>
        <div className="mt-10 w-[90%] lg:w-[80%] mx-auto">
          <p className=" text-base text-justify md:text-lg font-roboto md:text-center leading-10">
            Stay connected with us and never miss out on the latest updates,
            exclusive offers, and valuable insights. Subscribe to our newsletter
            and be the first to know about new job opportunities, industry
            trends, and career resources. Don`t wait, join our community today
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-center p-4 gap-4">
            <input
              className="w-full lg:w-[40%] p-3 rounded shadow outline-[#007bff]"
              type="email"
              placeholder="@eg-> workhubso@gmail.com"
            />
            <button
              className="w-full lg:w-[20%] p-3 rounded shadow bg-primaryColor 
						hover:bg-[#007bff]  text-white transition-all ease-in-out duration-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
