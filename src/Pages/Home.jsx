import React from "react";
import { Hero } from "../components/Hero";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
import { About } from "../components/About";
import { Helmet } from "react-helmet-async";
import ContactSection from "../components/Contact";
import { Achievement } from "../components/HomePage/Achievement";
import { AnnualProgram } from "../components/HomePage/AnnualProgram";
import { Testimonial } from "../components/HomePage/Testimonial";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Marquee from "react-fast-marquee";
export const Home = () => {
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/notices`
      );
      return data;
    },
  });
  console.log(notices);
  return (
    <>
      <Helmet>
        <title>SN-Home</title>
      </Helmet>
      <div className="relative max-sm:mb-80 mb-10 ">
        <Hero></Hero>
        <div className="absolute z-50 -bottom-[280px] lg:-bottom-5 left-1/2 transform -translate-x-1/2 w-11/12  mx-auto bg-green-800 rounded-lg p-5 flex max-sm:flex-col items-center justify-between">
          <div className="flex max-sm:flex-col items-center gap-2 md:gap-5">
            <img className="w-20" src={logo} alt="" />
            <div>
              <h3 className="text-2xl font-bold py-2 text-center underline text-blue-50">নোটিশ বোর্ড:</h3>
              <Link to="/all-notice">
                <Marquee
                  pauseOnHover={true}
                  style={{width: "300px"}}
                  className="text-md font-medium text-blue-50"
                >
                  {notices.map((notice) => (
                    <>
                      <p key={notice._id} className="mx-6">
                        {notice.title}।
                      </p>
                    </>
                  ))}
                </Marquee>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <About></About>
      <Achievement></Achievement>
      <AnnualProgram></AnnualProgram>
      <Testimonial></Testimonial>
      <ContactSection></ContactSection>
    </>
  );
};
