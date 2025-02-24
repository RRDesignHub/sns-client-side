import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import logo from "./../assets/logo.png";
import { PiUsersFourFill } from "react-icons/pi";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaPlus,
  FaUsers,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { TbArrowGuideFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaUsersGear, FaUsersBetweenLines } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import { MdBookmarkAdded } from "react-icons/md";
export const Dashboard = () => {
  const isAdmin = true;
  const navigate = useNavigate();
  const [openCloseMenu, setOpenCloseMenu] = useState(true);

  const handleOpenCloseMenu = () => {
    setOpenCloseMenu(!openCloseMenu);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed shadow ${
          openCloseMenu ? "max-sm:w-[270px]" : "max-sm:w-10"
        } transform ease-in-out duration-700 md:w-64 relative bg-green-100 text-sand `}
      >
        <div className="md:hidden py-3 text-center">
          {openCloseMenu ? (
            <>
              <div className="mx-2 flex justify-between items-center gap-2">
                <img src={logo} alt="" />
                <IoArrowForwardCircle
                  className={`text-4xl text-terracotta `}
                  onClick={handleOpenCloseMenu}
                />
              </div>
            </>
          ) : (
            <IoArrowBackCircle
              className={`mx-auto  text-4xl text-terracotta `}
              onClick={handleOpenCloseMenu}
            />
          )}

          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>

          <nav className="space-y-2 md:space-y-4">
            {/* Admin-Specific Links */}
            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <CgProfile className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Admin Profile" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <FaUsersGear className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Manages Users" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/add-package"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <LuPackagePlus className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Add Package" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/added-packages"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <MdBookmarkAdded className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Added Packages" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/manage-candidates"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <FaUsersBetweenLines className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Manage Candidates" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/add-admin-story"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <FaPlus className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Add Story" : ""}
                  </span>
                </NavLink>
                <NavLink
                  to="/dashboard/manage-admin-stories"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                      : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
                  }
                >
                  <FaBookOpen className="w-5 h-5" />
                  <span className="text-xs ">
                    {openCloseMenu ? "Manage Stories" : ""}
                  </span>
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* footer btn for small screen */}
        <div className="md:hidden divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
        <div className="md:hidden mx-auto text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-2 gap-2 py-2 bg-terracotta text-white "
                : "flex items-center ps-2 gap-2 py-2 hover:bg-terracotta hover:text-white transition "
            }
          >
            <FaHome className="w-5 h-5" />
            <span className="text-xs ">{openCloseMenu ? "Home" : ""}</span>
          </NavLink>
        </div>

        {/* aside for md/lg screen */}
        <div className="max-sm:hidden  w-full py-4 h-full flex flex-col shadow">
          <div className="flex flex-col items-center justify-center">
            <img src={logo} className="w-16" alt="" />
            <h3 className="text-green-950 text-xl font-semibold text-center">Dashboard</h3>
          </div>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <nav className=" space-y-4 px-4">
            {/* Admin-Specific Links */}
            {isAdmin && (
              <>
                <NavLink
                  to="/dashboard/overview"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-green-950 transition rounded-lg"
                  }
                >
                  <MdDashboard className="w-5 h-5" />
                  Overview
                </NavLink>
                <NavLink
                  to="/dashboard/add-student"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-green-950 transition rounded-lg"
                  }
                >
                  <IoMdPersonAdd className="w-5 h-5" />
                  Add Student
                </NavLink>
                <NavLink
                  to="/dashboard/students"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-green-950 transition rounded-lg"
                  }
                >
                  <PiUsersFourFill className="w-5 h-5" />
                  All Students
                </NavLink>
                <NavLink
                  to="/dashboard/added-packages"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <MdBookmarkAdded className="w-5 h-5" />
                  My Added Packages
                </NavLink>
                <NavLink
                  to="/dashboard/manage-candidates"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaUsersBetweenLines className="w-5 h-5" />
                  Manage Candidates
                </NavLink>
                <NavLink
                  to="/dashboard/add-admin-story"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaPlus className="w-5 h-5" />
                  Add Story
                </NavLink>
                <NavLink
                  to="/dashboard/manage-admin-stories"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 px-4 py-2 bg-terracotta text-white rounded-lg"
                      : "flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
                  }
                >
                  <FaBookOpen className="w-5 h-5" />
                  Manage Stories
                </NavLink>
              </>
            )}
          </nav>

          <div className="mt-auto ">
            <div className="px-4">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-terracotta hover:text-white transition rounded-lg"
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
            </div>
            <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
            <p className="text-xs pt-2 text-terracotta text-center">
              All right reserved | TourHub
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
