import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import logo from "./../assets/logo.png";
import { RiBookShelfFill } from "react-icons/ri";
import { PiUsersFourFill, PiBookOpenTextFill } from "react-icons/pi";
import { FaHome, FaIdCard, FaRegIdCard } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard, MdOutlineAddchart } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { GiPapers } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
export const Dashboard = () => {
  const { logoutUser } = useAuth();
  const isAdmin = true;
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  const location = useLocation();
  
  const handleOpenCloseMenu = () => {
    setOpenCloseMenu(!openCloseMenu);
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed shadow ${
          openCloseMenu ? "max-sm:w-[140px]" : "max-sm:w-8"
        } transform ease-in-out duration-700 md:w-64 relative bg-green-50 text-sand `}
      >
        <div className="md:hidden py-3 text-center">
          {openCloseMenu ? (
            <>
              <div className="mx-2 flex justify-between items-center gap-2">
                <img src={logo} alt="" className={`max-sm:w-8`} />
                <IoArrowBackCircle
                  className={`text-3xl text-green-800`}
                  onClick={handleOpenCloseMenu}
                />
              </div>
            </>
          ) : (
            <IoArrowForwardCircle
              className={`mx-auto text-3xl text-green-800`}
              onClick={handleOpenCloseMenu}
            />
          )}

          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          {/* links for small screen */}
          <nav className="space-y-2 md:space-y-4">
            {/* Admin-Specific Links for small screen*/}
            {isAdmin && (
              <>
              {/* overview */}
                <NavLink
                  to="/dashboard"
                  className={`${location.pathname == "/dashboard" ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white" : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition"}`}
                  
                >
                  <MdDashboard className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Overview" : ""}
                  </span>
                </NavLink>

                {/* create user*/}
                <NavLink
                  to="/dashboard/create-user"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <IoMdPersonAdd className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Create User" : ""}
                  </span>
                </NavLink>

                {/* all user*/}
                <NavLink
                  to="/dashboard/all-user"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <IoMdPersonAdd className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "All User" : ""}
                  </span>
                </NavLink>

                {/* add student */}
                <NavLink
                  to="/dashboard/add-student"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <IoMdPersonAdd className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "শিক্ষার্থী যোগ" : ""}
                  </span>
                </NavLink>

                {/* add notice */}
                <NavLink
                  to="/dashboard/add-notice"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <HiSpeakerphone className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "নোটিশ যোগ" : ""}
                  </span>
                </NavLink>

                {/* add subject */}
                <NavLink
                  to="/dashboard/add-subjects"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <PiBookOpenTextFill className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "বিষয় যোগ" : ""}
                  </span>
                </NavLink>

                {/* add result */}
                <NavLink
                  to="/dashboard/add-result"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <MdOutlineAddchart className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "ফলাফল তৈরি" : ""}
                  </span>
                </NavLink>

                {/* create admit card */}
                <NavLink
                  to="/dashboard/add-admit-card"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <MdOutlineAddchart className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "এডমিট কার্ড তৈরি" : ""}
                  </span>
                </NavLink>

                {/* all students */}
                <NavLink
                  to="/dashboard/students"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <PiUsersFourFill className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "সকল শিক্ষার্থী" : ""}
                  </span>
                </NavLink>


                {/* subjects */}
                <NavLink
                  to="/dashboard/subjects"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <RiBookShelfFill className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "বিষয়সমূহ" : ""}
                  </span>
                </NavLink>

                {/*  এডমিট কার্ড */}
                <NavLink
                  to="/dashboard/class-admit-cards"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <FaRegIdCard className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "এডমিট কার্ড" : ""}
                  </span>
                </NavLink>
               
               {/* ফলাফল */}
                <NavLink
                  to="/dashboard/results"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
                  }
                >
                  <GiPapers className="w-4 h-4" />
                  <span className="text-xs ">
                    {openCloseMenu ? "ফলাফল" : ""}
                  </span>
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* footer btn for small screen */}
        <div className="md:hidden divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
        <div className="absolute bottom-5 md:hidden mx-auto text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-2 gap-2 py-2 bg-green-100 text-white "
                : "flex items-center ps-2 gap-2 py-2 hover:bg-green-100 hover:text-white transition "
            }
          >
            <FaHome className="w-4 h-4" />
            <span className="text-xs ">{openCloseMenu ? "Home" : ""}</span>
          </NavLink>
          <button
            onClick={() => logoutUser()}
            className="w-full flex items-center ps-2 gap-2 py-2 bg-[#166534] hover:bg-[#166534] text-white "
          >
            <LuLogOut className="w-4 h-4" />
            <span className="text-xs ">{openCloseMenu ? "Logout" : ""}</span>
          </button>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <p className="max-sm:hidden text-xs pt-2 text-terracotta text-center">
            @Shah Neyamat School
          </p>
        </div>

        {/* aside for md/lg screen */}
        <div className="max-sm:hidden  w-full py-4 h-full flex flex-col shadow">
          <div className="flex flex-col items-center justify-center">
            <img src={logo} className="w-16" alt="" />
            <h3 className="text-green-950 text-xl font-semibold text-center">
              Dashboard
            </h3>
          </div>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <nav className="space-y-4 px-4">
            {/* Admin-Specific Links */}
            {isAdmin && (
              <>
                {/* overview */}
                <NavLink
                  to="/dashboard"
                  className={`${location.pathname == "/dashboard" ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg" : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"}`}
                >
                  <MdDashboard className="w-5 h-5" />
                  Overview
                </NavLink>

                {/* create user */}
                <NavLink
                  to="/dashboard/create-user"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <IoMdPersonAdd className="w-5 h-5" />
                  Create User
                </NavLink>

                {/* সকল ইউজার */}
                <NavLink
                  to="/dashboard/all-user"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <IoMdPersonAdd className="w-5 h-5" />
                  All User
                </NavLink>

                {/* add student */}
                <NavLink
                  to="/dashboard/add-student"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <IoMdPersonAdd className="w-5 h-5" />
                  শিক্ষার্থী যোগ
                </NavLink>

                {/* add notice */}
                <NavLink
                  to="/dashboard/add-notice"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <HiSpeakerphone className="w-5 h-5" />
                  নোটিশ যোগ
                </NavLink>

                {/* add subject */}
                <NavLink
                  to="/dashboard/add-subjects"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <PiBookOpenTextFill className="w-5 h-5" />
                  বিষয় যোগ
                </NavLink>

                {/* add admit card */}
                <NavLink
                  to="/dashboard/add-admit-card"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <FaIdCard className="w-5 h-5" />
                  এডমিট কার্ড তৈরি
                </NavLink>

                  {/* // add result */}
                <NavLink
                  to="/dashboard/add-result"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <MdOutlineAddchart className="w-5 h-5" />
                  ফলাফল তৈরি
                </NavLink>

                {/* all students */}
                <NavLink
                  to="/dashboard/students"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <PiUsersFourFill className="w-5 h-5" />
                  সকল শিক্ষার্থী
                </NavLink>

                {/* all subjects */}
                <NavLink
                  to="/dashboard/subjects"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <RiBookShelfFill className="w-5 h-5" />
                  বিষয়সমূহ
                </NavLink>

                 {/* all classbased admit cards */}
                 <NavLink
                  to="/dashboard/class-admit-cards"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <FaRegIdCard className="w-5 h-5" />
                  এডমিট কার্ড
                </NavLink>

                {/* all results */}
                <NavLink
                  to="/dashboard/results"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
                  }
                >
                  <GiPapers className="w-5 h-5" />
                  ফলাফল
                </NavLink>
              </>
            )}
          </nav>

          {/* footer for md and lg */}
          <div className="mt-auto">
            <div className="px-4">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-white transition rounded-lg"
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
              <button
                onClick={() => logoutUser()}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-white transition rounded-lg"
              >
                <LuLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
            <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
            <p className="text-xs pt-2 text-terracotta text-center">
              @Shah Neyamat School
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-green-50 ">
        {/* Dynamic Section */}
        <section className="">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
