

import  { useState } from "react";
import key from "../../assets/Onboarding.png";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function About() {

    const [ShowMore, setIsShowMore] = useState(false);

    const toggleMoreLess = () => {
        setIsShowMore(!ShowMore);
    };

    return (
      <>
        <Header/>
        <div className="flex flex-col gap-4  w-full bg-white ">
            <div className="md:px-[10%] px-6 py-6 pb-8 mb-12 flex flex-col md:flex-row w-full">
                <div className="p-2 w-full md:w-[60%] ">
                    <img src={key} className="w-full h-full" alt="" />
                </div>
                <div className="pl-[6%] mt-[8%] flex flex-col w-[100%]">
                    <h3 className="font-bold text-2xl text-primaryColor">About Us</h3>
                    <p className="text-HeadingColor text-base break-words pr-6">
                        <b> Work Hub So, </b>Welcome to our job search platform, dedicated to connecting job seekers and employers in Somalia. We are committed to building a robust platform that enables job seekers to create profiles, upload resumes, and receive job alerts.
                                                Employers can showcase their company profiles and job openings. We go beyond job listings by providing valuable career resources and industry insights. Our platform empowers individuals to navigate their professional journeys successfully and make informed decisions.
                                                Join us as we bridge the gap between talent and opportunity, driving economic growth and fostering meaningful connections in Somalia job market.</p>
                         

                    {ShowMore && (
                        <div>
                            <span className="text-HeadingColor text-base break-words pr-6 transition ease-in-aut mt-8">
                                <h3 className="font-bold text-2xl text-primaryColor mt-8">Vission</h3>
                                <p className="text-HeadingColor text-base break-words pr-6">
                                    <b> Work Hub So, </b>Our vision is to be the leading job search platform in Somalia, connecting job seekers and employers and driving economic growth through meaningful connections.
                                </p>
                            </span>

                            <span className="text-HeadingColor text-base break-words pr-6 transition ease-in-aut mt-4">
                                <h3 className="font-bold text-2xl text-primaryColor">Mission</h3>
                                <p className="text-HeadingColor text-base break-words pr-6">
                                    <b> Work Hub So, </b>We are committed to building a robust platform that enables job seekers to create profiles, upload resumes, and receive job alerts.
                                </p>
                            </span>
                        </div>
                    )}

                    <button className='w-[40%] bg-primaryColor mt-4 p-3 px-4 rounded-lg font-medium text-sm text-white cursor-pointer transition-all hover:bg-primaryColor shadow-[0px_4px_0px_0px_primaryColor] hover:shadow-[0px_4px_0px_0px_primaryColor]'
                        onClick={toggleMoreLess}>
                        {!ShowMore ? 'See More' : 'See less'}
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default About;