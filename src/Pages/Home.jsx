import React from "react";
import { Hero } from "../components/Hero";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
import { About } from "../components/About";
export const Home = () => {
  return (
    <>
      <div className="relative max-sm:mb-80 mb-10 ">
        <Hero></Hero>
        <div className="absolute -bottom-[280px] lg:-bottom-5 left-1/2 transform -translate-x-1/2 w-11/12  mx-auto bg-green-800 rounded-lg p-5 flex max-sm:flex-col items-center justify-between">
          <div className="flex max-sm:flex-col items-center gap-5">
          <img className="w-20" src={logo} alt="" />
          <div>
            <h2 className="text-2xl max-sm:text-center lg:text-4xl font-bold text-white">
              Shah Neyamat (RH:) KG & High School
            </h2>
            <p className="text-white text-center max-sm:mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          </div>
          <Link className="btn bg-white text-black rounded-3xl px-8">
            About Us
          </Link>
        </div>
      </div>
      <About></About>
    </>
  );
};
